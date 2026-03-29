import telebot
import openai
import os

TELEGRAM_TOKEN = os.getenv("8583371666:AAGLPQF97qkkyDTVqhHhs3MSe1PiWjqPExA")
openai.api_key = os.getenv("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")

bot = telebot.TeleBot(TELEGRAM_TOKEN)

@bot.message_handler(func=lambda message: True)
def reply(message):
    user_text = message.text

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "คุณคือ AI ชื่อ NattDev AI ตอบภาษาไทย"},
            {"role": "user", "content": user_text}
        ]
    )

    reply_text = response["choices"][0]["message"]["content"]
    bot.reply_to(message, reply_text)

bot.polling()
