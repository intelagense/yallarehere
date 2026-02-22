import { NextRequest, NextResponse } from "next/server";
import { Telegraf } from "telegraf";

export async function POST(req: NextRequest) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        return NextResponse.json({ message: "Telegram bot token or chat ID is missing." }, { status: 500 });
    }

    try {
        const bot = new Telegraf(botToken);
        const message = "🙏 Someone is at the door. Please let them in. 🥺";
        await bot.telegram.sendMessage(Number(chatId), message);
        return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error sending Telegram message:", error);
        return NextResponse.json({ message: "Failed to send message." }, { status: 500 });
    }
}