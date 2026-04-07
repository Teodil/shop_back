import * as TE from "fp-ts/TaskEither"
import pg from "pg"
import { pool } from "./pool"

export type TxClient = pg.PoolClient

const toErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message
    }

    if (typeof error === "string") {
        return error
    }

    try {
        return JSON.stringify(error)
    } catch {
        return "Unknown database error"
    }
}

export const withTransaction = <A>(
    fn: (client: TxClient) => Promise<A>
): TE.TaskEither<string, A> =>
    TE.tryCatch(async () => {
        const client = await pool.connect()

        try {
            await client.query("BEGIN")

            const result = await fn(client)

            await client.query("COMMIT")
            return result
        } catch (error) {
            await client.query("ROLLBACK")
            throw error
        } finally {
            client.release()
        }
    }, toErrorMessage)