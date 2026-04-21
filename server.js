const express = require("express")
const axios = require("axios")
require("dotenv").config()

const app = express()
app.use(express.json())

async function getLLMResponse(userMessage) {
  const prompt = `
You are an AI Academy assistant.

Course Info:
- Module 1: Introduction to LLM (Free)
- Module 2: Basics of Prompting (Free)
- Module 3: Deep Dive into LLM Integration (Paid ₹499)
- Module 4: Advanced LLM & Agentic AI (Paid ₹499)
- Certificate after completion
- Payment link: https://ai-academy.example.com/pricing

Rules:
- Answer ONLY using the above information
- Keep answers short, friendly, and conversational
- Use bullet points when helpful
- Always guide the user toward enrollment when relevant

User: ${userMessage}
`

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.5
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LLM_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    return response.data.choices[0].message.content
  } catch (err) {
    console.log("LLM error:", err.message)
    return "Something went wrong. Please try again."
  }
}

app.post("/webhook", async (req, res) => {
  try {
    const msg = req.body?.messages?.[0]
    const text = msg?.text?.body
    const from = msg?.from
    const fromMe = msg?.from_me

    if (!text || !from || fromMe) return res.sendStatus(200)

    let reply = ""
    const userText = text.toLowerCase()

    if (userText.includes("ai academy")) {
      reply = "Thank you for reaching out to the AI Academy! How can I help you today?"
    } else {
      reply = await getLLMResponse(text)
    }

    await new Promise(r => setTimeout(r, 800))

    await axios.post(
      "https://gate.whapi.cloud/messages/text",
      {
        to: from,
        body: reply
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHAPI_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    )

    res.sendStatus(200)
  } catch (err) {
    console.log("server error:", err.message)
    res.sendStatus(200)
  }
})

app.get("/", (req, res) => {
  res.send("ok")
})

app.listen(process.env.PORT, () => {
  console.log("running")
})