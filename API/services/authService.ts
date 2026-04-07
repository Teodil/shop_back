import * as TE from "fp-ts/TaskEither"
import * as O from "fp-ts/Option"
import { db } from "../infrastructure/db/db"
import { pipe } from "fp-ts/lib/function"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {withTransaction} from "../infrastructure/db/transaction";
import {addUser, addUserVerifyCode} from "../infrastructure/db/userDbProvider";
import {generateSecureCode} from "../utils/random";
import {publishUserRegistered} from "../infrastructure/kafka/producer";

const SECRET = "very_secret"

export const register = (
    username: string,
    password: string,
    email: string
) =>
    pipe(
        TE.tryCatch(
            () => bcrypt.hash(password, 10),
            () => "HashError"
        ),
        TE.chain((hashedPassword) =>
            withTransaction(async (client) => {
                const user = {
                    username,
                    password: hashedPassword,
                    email,
                    isVerified: false,
                }

                const result = await addUser(user, client)
                const verifyCode = generateSecureCode()

                await addUserVerifyCode(result.id, verifyCode, client)
                await publishUserRegistered({
                    userId: result.id,
                    email: user.email,
                    code: verifyCode,
                })

                return result.id
            })
        )
    )

export const login = (username: string, password: string) =>
        pipe(
            db.users.find(u => u.username === username),
            O.fromNullable,
            TE.fromOption(() => "User not found"),

            TE.chain(user => 
                pipe(
                    TE.tryCatch(
                        () => bcrypt.compare(password, user.password),
                        () => "Compare error"
                    ),
                    TE.chain(valid =>
                        valid
                            ? TE.right(
                                jwt.sign({id: user.id}, SECRET)
                              )
                            : TE.left("Invalid password")
                    )
                )    
            )
        )

export const verify = (token: string) =>
    TE.tryCatch(
        async ()=> jwt.verify(token, SECRET),
        ()=> "Invalid token"
    )

