import { pool } from "./pool";
import {User} from "../../domain/user";
import {DbExecutor} from "./dbTypes";

type InsertUserResult = {
    id: number
}

export const addUser = async (user: User, db?: DbExecutor) => {
    const dbConnect = db || pool;

    const result = await dbConnect.query<InsertUserResult>(
        `
        INSERT INTO
            public.users (username, "password", email, "is_verified")
            values ($1, $2, $3, $4)
            RETURNING id`,
        [user.username, user.password, user.email, user.isVerified]
    )

    return result.rows[0];
}

export const addUserVerifyCode = async (userId: number, verifyCode: string, db?: DbExecutor) => {
    const dbConnect = db || pool;

    await dbConnect.query(
        `
        INSERT INTO 
            public.verify_codes (user_id, verify_code)
            values ($1, $2)`,
        [userId, verifyCode]
    )
}

export const getUserByUserName = async (username: string, db?: DbExecutor) => {
    const dbConnect = db || pool;

    const result = await dbConnect.query<User>(
        `
        SELECT 
            id,
            username, 
            password, 
            email, 
            is_verified AS isVerified
            FROM public.users WHERE username = $1`,
        [username]
    )

    return result.rows[0];
}

export const getUserByEmail = async (email: string) => {
    const result = await pool.query<User>(
        `
        SELECT 
            id,
            username, 
            password, 
            email,
            is_verified AS isVerified
            FROM public.users WHERE email = $1`,
        [email]
    )
    return result.rows[0];
}

export const getUserLastVerifyCode = async (userId: number, db?: DbExecutor) => {
    const dbConnect = db || pool;

    const result = await  dbConnect.query<VerifyCode>(
        `
        SELECT TOP 1
            user_id AS userId,
            verify_code AS verifyCode,
            created_at AS createdAt
            FROM public.verify_codes
            WHERE user_id = $1
        `,
        [userId]
    )

    return result.rows[0];
}