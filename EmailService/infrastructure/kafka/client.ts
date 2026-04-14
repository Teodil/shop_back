import { Kafka } from "kafkajs"

const brokers = (process.env.KAFKA_URL || "localhost:9092").split(",")

export const kafka = new Kafka({
    clientId: "shop-api",
    brokers,
})