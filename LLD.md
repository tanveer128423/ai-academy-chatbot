Low Level Design – AI Academy WhatsApp Chatbot
1. Overview

This system is a WhatsApp chatbot integrated with an LLM to answer queries about the AI Academy course. It uses a webhook-based architecture to receive and respond to user messages in real time.

2. Architecture
User (WhatsApp)
     ↓
Whapi (WhatsApp API)
     ↓
Webhook (Node.js Express Server)
     ↓
LLM (Groq API)
     ↓
Response → Whapi → WhatsApp
3. Components
1. WhatsApp (Client)
User sends messages
Entry point: "AI-Academy"
2. Whapi
Acts as bridge between WhatsApp and backend
Sends incoming messages via webhook
Sends responses back to user
3. Backend Server (Node.js + Express)
Handles webhook requests
Processes user input
Calls LLM API
Sends response via Whapi
4. LLM (Groq API)
Generates dynamic responses
Uses predefined course context
Restricts answers to relevant information
4. Message Flow
User sends message on WhatsApp
Whapi forwards message to /webhook
Backend extracts message and sender
If message contains "AI-Academy" → send welcome message
Otherwise → forward query to LLM
LLM generates response using course context
Backend sends response via Whapi
User receives reply on WhatsApp
5. Prompt Design
Static course data passed in prompt
Ensures no external hallucination
Restricts model to:
Modules
Pricing
Enrollment
Certificate info
6. Ban Avoidance Strategy

To prevent WhatsApp number bans:

Only respond to user-initiated messages
No bulk or automated outbound messaging
Testing limited to a single known number
No spam or repeated messages
Added delay between responses
Followed WhatsApp rate limits
7. Error Handling
Handles missing message fields
Handles API failures
Returns fallback response if LLM fails
Prevents crashes using try-catch
8. Future Improvements
Add RAG for dynamic knowledge retrieval
Store chat history for personalization
Multi-language support
User session tracking
Analytics dashboard