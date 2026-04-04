import * as TE from "fp-ts/TaskEither"
import * as O from "fp-ts/Option"
import { db } from "../infrastructure/db"
import { pipe } from "fp-ts/lib/function"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../domain/user"

const SECRET = "very_secret"

export const register = (username: string, password: string) =>
    pipe(
        TE.tryCatch(
            () => bcrypt.hash(password, 10),
            () => "HashError"
        ),
        TE.map( (hashed): User => {
            let hashedPassword = hashed as string
            const user = {
                id: Date.now(),
                username,
                password: hashedPassword
            }
            db.users.push(user);
            return user
        })
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

