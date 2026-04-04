import { Response } from "express";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither"

export const handler = <E, A>(
    res: Response,
    task: TE.TaskEither<E, A>
) =>
    pipe(
        task,
        TE.match(
            (e)=> res.status(400).json({error: JSON.stringify(e)}),
            (a)=> res.json(a)
        )
    )()