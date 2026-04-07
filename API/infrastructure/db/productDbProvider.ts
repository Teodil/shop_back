import { Product } from "../../domain/product";
import { pool } from "./pool";
import {DbExecutor} from "./dbTypes";

export const getAllProducts = async (db?: DbExecutor) =>{
    const dbConnect = db || pool;

    const result = await dbConnect.query<Product>(
        `
        SELECT
            id,
            name,
            price
            FROM public.products
            ORDER BY id`
    )

    return result.rows;
}

export const getProductById = async (id: number, db?: DbExecutor) => {
    const dbConnect = db || pool;

    const result = await dbConnect.query<Product>(
        `
        SELECT
            id,
            name,
            price
            FROM public.products
            WHERE id = $1`,
        [id]
    )

    return result.rows;
}