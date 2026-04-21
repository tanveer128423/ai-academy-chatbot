# AI Academy WhatsApp Chatbot

A WhatsApp chatbot powered by an LLM that answers user queries about AI Academy courses and guides users toward enrollment.

---

## Features
- WhatsApp chatbot using Whapi API
- LLM-powered dynamic responses (Groq - LLaMA 3)
- Context-based answers (no hallucination)
- Enrollment guidance with payment link
- Ban-safe design (no spam or bulk messaging)

---

## Tech Stack
- Node.js
- Express.js
- Whapi (WhatsApp API)
- Groq API (LLM)

---

## Architecture
User → WhatsApp → Whapi → Backend → LLM → Response

---

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
