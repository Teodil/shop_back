import { Router } from "express";
import { handler } from "../utils/httpHandler";
import { getAll, getById } from "../services/productService";

export const productsRoutes = Router()

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Получить список товаров
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Список всех товаров
 */
productsRoutes.get(
    "/", 
    (_, res) => handler(res, getAll())
)

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Получить товар по Id
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Найденный товар
 */
productsRoutes.get(
    "/:id", 
    (req, res) => handler( res, getById(Number(req.params.id)) )
)