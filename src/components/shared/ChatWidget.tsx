"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const INITIAL_MESSAGE: Message = {
    role: "assistant",
    content:
        "¡Hola! Hi! I'm **Lumi** 🌟, your LinguaConnect assistant. I can help you with courses, pricing, scheduling, and more. What would you like to know?",
};

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;
        const userMsg: Message = { role: "user", content: input.trim() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMsg] }),
            });

            if (!res.ok) throw new Error("Failed");
            const reader = res.body?.getReader();
            const decoder = new TextDecoder();
            let assistantText = "";
            setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value);
                    const lines = chunk.split("\n");
                    for (const line of lines) {
                        if (line.startsWith("data: ")) {
                            const data = line.slice(6);
                            if (data === "[DONE]") break;
                            try {
                                const parsed = JSON.parse(data);
                                const delta = parsed.choices?.[0]?.delta?.content ?? "";
                                assistantText += delta;
                                setMessages((prev) => {
                                    const updated = [...prev];
                                    updated[updated.length - 1] = { role: "assistant", content: assistantText };
                                    return updated;
                                });
                            } catch {
                                // skip non-JSON lines
                            }
                        }
                    }
                }
            }
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, I had trouble connecting. Try messaging us on WhatsApp!" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "1234567890"}`;

    return (
        <>
            {/* Chat Bubble */}
            <button
                onClick={() => setOpen(!open)}
                aria-label="Open chat with Lumi"
                className={cn(
                    "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300",
                    "bg-gradient-to-br from-primary to-primary-600 text-white hover:scale-110 active:scale-95",
                    open && "rotate-90"
                )}
            >
                {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>

            {/* Chat Window */}
            {open && (
                <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-card shadow-2xl flex flex-col overflow-hidden border border-slate/10 animate-fade-up">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-primary-600 px-4 py-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-white font-semibold text-sm">Lumi</p>
                            <p className="text-white/70 text-xs">LinguaConnect Assistant</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="bg-white flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "flex items-start gap-2",
                                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                )}
                            >
                                {msg.role === "assistant" && (
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                        <Sparkles className="w-3 h-3 text-primary" />
                                    </div>
                                )}
                                <div
                                    className={cn(
                                        "rounded-2xl px-3 py-2 text-sm max-w-[80%] leading-relaxed",
                                        msg.role === "user"
                                            ? "bg-primary text-white rounded-tr-sm"
                                            : "bg-slate/10 text-charcoal rounded-tl-sm"
                                    )}
                                    dangerouslySetInnerHTML={{
                                        __html: msg.content
                                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                                            .replace(/\n/g, "<br/>"),
                                    }}
                                />
                            </div>
                        ))}
                        {loading && (
                            <div className="flex items-start gap-2">
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Sparkles className="w-3 h-3 text-primary" />
                                </div>
                                <div className="bg-slate/10 rounded-2xl rounded-tl-sm px-3 py-2">
                                    <div className="flex gap-1">
                                        {[0, 1, 2].map((i) => (
                                            <div
                                                key={i}
                                                className="w-1.5 h-1.5 rounded-full bg-slate/40 animate-bounce"
                                                style={{ animationDelay: `${i * 0.15}s` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Talk to Human */}
                    <div className="bg-white border-t border-slate/10 px-4 py-2">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-slate hover:text-secondary transition-colors flex items-center gap-1"
                        >
                            💬 Talk to a human on WhatsApp
                        </a>
                    </div>

                    {/* Input */}
                    <div className="bg-white border-t border-slate/10 p-3 flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Ask me anything..."
                            className="flex-1 text-sm px-3 py-2 rounded-lg border border-slate/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            aria-label="Chat input"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || loading}
                            className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white hover:bg-primary-600 disabled:opacity-40 transition-all"
                            aria-label="Send message"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
