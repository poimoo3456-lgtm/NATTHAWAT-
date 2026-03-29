export default async function handler(req, res) {
  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  const message = req.body.message;
  if (!message) return res.status(200).send("No message");

  const chatId = message.chat.id;
  const userText = message.text;

  // 🔥 เรียก OpenAI
  const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "คุณคือ AI ชื่อ NattDev AI ตอบภาษาไทย" },
        { role: "user", content: userText }
      ]
    })
  });

  const aiData = await aiRes.json();
  const reply = aiData.choices[0].message.content;

  // 🔥 ส่งกลับ Telegram
  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: reply
    })
  });

  return res.status(200).send("ok");
}
