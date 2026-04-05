import { NextResponse } from "next/server";

const LUMI_SYSTEM_PROMPT = `You are Lumi, the friendly AI assistant for LinguaConnect — an online platform for English and Spanish speaking classes. You help prospective and current students with questions about:

- Available courses: Conversational English, Business English, Spanish for Beginners, Advanced Spanish Discussion
- Pricing: 1:1 classes start at $25/hour, group classes at $12/session. Packages: 5 classes for $110, 10 for $200, 20 for $360.
- Class format: Live video calls via Zoom/Google Meet, 60 min for 1:1, 45 min for group (max 6 students)
- Levels: Beginner (A1-A2), Intermediate (B1-B2), Advanced (C1-C2)
- Schedule: Classes available Mon-Sat, 8am-9pm EST. Students pick their own slot.
- Free trial: First 30-minute class is free for new students.
- Cancellation: Free cancellation up to 24 hours before. After that, credit is used.

Tone: Warm, encouraging, helpful. Use simple language. If you don't know something specific, say 'Let me connect you with our team for details!' and suggest they click the WhatsApp button or email hello@linguaconnect.com.

Always respond in the same language the student writes in (English or Spanish).
Keep responses concise (2-4 sentences max unless they ask for detail).
End with a helpful follow-up question or CTA when appropriate.`;

// Simple in-memory rate limiting
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitStore.get(ip);
    if (!entry || entry.resetAt < now) {
        rateLimitStore.set(ip, { count: 1, resetAt: now + 3600_000 });
        return true;
    }
    if (entry.count >= 20) return false;
    entry.count++;
    return true;
}

export async function POST(req: Request) {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";

    if (!getRateLimit(ip)) {
        return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
        return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage?.content || lastMessage.content.length > 500) {
        return NextResponse.json({ error: "Message too long or empty" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey.startsWith("sk-your")) {
        // Return a demo response if no key configured
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            start(controller) {
                const demo = "Hi! I'm Lumi 🌟 — LinguaConnect's AI assistant. It looks like the OpenAI API key isn't configured yet. Once it's set up, I'll be able to answer all your questions about courses, pricing, and scheduling! In the meantime, click the WhatsApp button to chat with a real person. 😊";
                for (const char of demo) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: char } }] })}\n\n`));
                }
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                controller.close();
            },
        });
        return new Response(stream, {
            headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
        });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            stream: true,
            messages: [
                { role: "system", content: LUMI_SYSTEM_PROMPT },
                ...messages.map((m: { role: string; content: string }) => ({
                    role: m.role,
                    content: m.content,
                })),
            ],
        }),
    });

    if (!response.ok) {
        return NextResponse.json({ error: "OpenAI API error" }, { status: 500 });
    }

    return new Response(response.body, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    });
}
