const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple "AI" logic placeholder
function getBotReply(message) {
  const lower = message.toLowerCase();

  if (lower.includes("hours") || lower.includes("time")) {
    return { text: "We are open from 9 AM to 9 PM every day.", confident: true };
  }

  if (lower.includes("menu") || lower.includes("food")) {
    return { text: "You can view our full menu on the Menu page of the website.", confident: true };
  }

  // Not confident → trigger human
  return {
    text: "I'm not sure about that. Let me notify a human to help you.",
    confident: false
  };
}

// TODO: configure real email or notification
function notifyAdmin(userMessage) {
  console.log("ADMIN ALERT: Customer needs help with:", userMessage);
  // Here you could use nodemailer, Twilio, etc.
}

app.post("/api/chat", (req, res) => {
  const userMessage = req.body.message || "";

  const ai = getBotReply(userMessage);

  if (!ai.confident) {
    notifyAdmin(userMessage);
  }

  res.json({ reply: ai.text });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Chat server running on http://localhost:${PORT}`);
});
