import * as TE from "fp-ts/TaskEither"
import * as O from "fp-ts/Option"
import { db } from "../infrastructure/db"
import { pipe } from "fp-ts/lib/function"

export const getAll = () => TE.right(db.products)

export const getById = (id: number) =>
    pipe(
        db.products.find(p=> p.id === id),
        O.fromNullable,
        TE.fromOption(()=> "Product not found")
    )