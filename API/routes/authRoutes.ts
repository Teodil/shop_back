import { Router } from "express";
import { handler } from "../utils/httpHandler";
import { login, register } from "../services/authService";

export const authRouter = Router()

/**
 * @openapi
 * /user/register:
 *  post:
 *      summary: Регистрация пользователя
 *      tags:
 *          - Auth
 *      requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - password
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: user12345
 *                          password:
 *                              type: string
 *                              example: 123456
 *      responses:
 *          200:
 *              description: Пользователь создан
 */
authRouter.post(
    "/register",
    (req, res) => handler(res, register(req.body.username, req.body.password))
)

/**
 * @openapi
 * /user/login:
 *  post:
 *      summary: Регистрация пользователя
 *      tags:
 *          - Auth
 *      requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - password
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: user12345
 *                          password:
 *                              type: string
 *                              example: 123456
 *      responses:
 *          200:
 *              description: Токен
 */
authRouter.post(
    "/login",
    (req, res) => handler(res, login(req.body.username, req.body.password))
)