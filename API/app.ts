import express from "express"
import { productsRoutes } from "./routes/productsRoutes"
import { authRouter } from "./routes/authRoutes"
import { cartRoutes } from "./routes/cartRoutes"
import { serve, setup } from "swagger-ui-express"
import { swaggerSpec } from "./swagger"

export const createApp = () => {
    const app = express()

    app.use(express.json())

    app.use("/products", productsRoutes)
    app.use("/user", authRouter)
    app.use("/cart", cartRoutes)

    app.use("/swagger", serve, setup(swaggerSpec))

    return app
} 