"use client";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "1234567890";
    const url = `https://wa.me/${number}?text=Hi%2C%20I%27m%20interested%20in%20language%20classes!`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-24 left-6 z-40 flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full shadow-xl hover:bg-[#1ebe57] hover:scale-105 active:scale-95 transition-all duration-200 group"
        >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-semibold max-w-0 group-hover:max-w-xs overflow-hidden whitespace-nowrap transition-all duration-300">
                WhatsApp
            </span>
        </a>
    );
}
