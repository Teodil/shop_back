import { Product } from "../domain/product";
import { pool } from "./pool";

const getAllProducts = async () =>{
    const result = await pool.query<Product>(
        `SELECT
            id,
            name,
            price,
            FROM products
            ORDER BY id`
    )

    return result.rows;
}

const getProductById = async (id: number) => {
    const result = await pool.query<Product>(
        `SELECT
            id,
            name,
            price,
            FROM products
            WHERE id = $1`,
        [id]
    )

    return result.rows;
}