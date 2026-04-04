import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { handler } from "../utils/httpHandler";
import { addProduct, getCart } from "../services/cartService";

export const cartRoutes = Router()

cartRoutes.use(authMiddleware)

/**
 * @openapi
 * /cart:
 *  post:
 *      summary: Добавление товара в корзину
 *      tags:
 *          - Cart
 *      security:
 *          - bearerAuth: []      
 *      requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - productId
 *                      properties:
 *                          productId:
 *                              type: number
 *                              example: 1
 *      responses:
 *          200:
 *              description: добавлен товар
 */
cartRoutes.post(
    "/",
    (req, res) => {
        console.log('test')
        return handler(
            res, 
            addProduct(
                (req as any).user.id,
                req.body.productId
            )
        )
    } 
)

/**
 * @openapi
 * /cart:
 *   get:
 *     summary: Получить корзину по пользователю
 *     tags:
 *       - Cart
 *     security:
 *          - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список товаров в корзине пользователя
 */
cartRoutes.get(
    "/",
    (req, res) => 
        handler (
            res, 
            getCart((req as any).user.id)
        ) 
)