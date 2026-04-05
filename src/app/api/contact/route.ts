import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message, interest } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // TODO: Insert into Supabase contact_submissions table
        // TODO: Send email via Resend

        console.log("Contact submission:", { name, email, interest, message });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Contact error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
