import { NextRequest, NextResponse } from "next/server";
import { Telegraf } from "telegraf";

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

if (!botToken || !chatId) {
    throw new Error("Telegram bot token or chat ID is missing in environment variables.");
}

const bot = new Telegraf(botToken);

export async function POST(req: NextRequest) {
    try {
        const message = "🙏 Someone is at the door. Please let them in. 🥺";
        const chatIdNumber = Number(chatId); // Convert chatId to a number
        await bot.telegram.sendMessage(chatIdNumber, message);
        return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error sending Telegram message:", error);
        return NextResponse.json({ message: "Failed to send message." }, { status: 500 });
    }
}