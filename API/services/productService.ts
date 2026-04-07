import * as TE from "fp-ts/TaskEither"
import * as O from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import { getAllProducts, getProductById } from "../infrastructure/db/productDbProvider"

export const getAll = () =>
    TE.tryCatch(
        () => getAllProducts(),
        () => "Failed to get products"
    )

export const getById = (id: number) =>
    pipe(
        TE.tryCatch(
            () => getProductById(id),
            () => "Failed to get product"
        ),
        TE.chain((product) =>
            pipe(
                product,
                O.fromNullable,
                TE.fromOption(() => "Product not found")
            )
        )
    )