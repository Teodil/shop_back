import { Product } from "../domain/product";
import { pool } from "./pool";

export const getAllProducts = async () =>{
    const result = await pool.query<Product>(
        `SELECT
             id,
             name,
             price
         FROM public.products
         ORDER BY id`
    )

    return result.rows;
}

export const getProductById = async (id: number) => {
    const result = await pool.query<Product>(
        `SELECT
             id,
             name,
             price
         FROM public.products
         WHERE id = $1`,
        [id]
    )

    return result.rows;
}