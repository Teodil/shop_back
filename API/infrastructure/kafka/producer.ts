import { kafka } from "./client"
import {ITopicConfig} from "kafkajs";

const producer = kafka.producer()

let connected = false
/*
const topicConfig: ITopicConfig = {
    topic
}

const createTopic = async (topic: string) => {
    const topicConfig: ITopicConfig = {
        topic,

    }

    kafka.admin().createTopics([
        {
            topic: topic,
            validateOnly: false,
            waitForLeaders: false,
            timeout: 500,
            topics: []
        }
    ])
}*/

export const connectProducer = async () => {
    if (!connected) {
        await producer.connect()
        connected = true
    }
}

export const publishUserRegistered = async (payload: UserRegistered) => {
    await connectProducer()

    await producer.send({
        topic: "user.registered",
        messages: [
            {
                key: String(payload.userId),
                value: JSON.stringify(payload),
            },
        ],
    })
}