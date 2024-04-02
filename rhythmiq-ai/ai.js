import { config } from "dotenv"
config()

import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.API_KEY
})



openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: "Songs similar to 'Drivers license' by Olivia Rodrigo"}]
}).then(res => {
    console.log(res.choices[0].message.content)
})

