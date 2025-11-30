const express = require("express");
const app = express();
app.use(express.json());

// Health check (Render necesita esto)
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// Webhook Verification
app.get("/webhook", (req, res) => {
  const verify_token = "XS2025";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === verify_token) {
    console.log("Webhook verified!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Handle incoming messages
app.post("/webhook", (req, res) => {
  console.log("Incoming:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Webhook running on port " + PORT);
});
