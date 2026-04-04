import swaggerJsdoc from "swagger-jsdoc"

export const swaggerSpec = swaggerJsdoc(
    {
        definition: {
            failOnErrors: true,
            openapi: '3.0.0',
            info: {
                version: "1.0",
                title: "ShopAPI",
                description: "tdfgdfgdf"
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT"
                    }
                }
            }
        },
        apis: ["./routes/*.ts"]
    }
)