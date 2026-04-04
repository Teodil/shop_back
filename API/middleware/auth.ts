import { NextFunction, Request, Response } from "express";
import { pipe } from "fp-ts/lib/function";
import { verify } from "../services/authService";
import * as TE from "fp-ts/TaskEither"

export const authMiddleware = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.sendStatus(401);
    }

    const token = header.split(" ")[1]
    
    pipe(
        verify(token),
        TE.match(
            ()=> { 
                res.sendStatus(403) 
            },
            (decoded) => {
                (req as any).user = decoded
                next();
            }
        )
    )()
}