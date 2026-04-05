"use client";
import { LangProvider } from "@/lib/i18n";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ChatWidget from "@/components/shared/ChatWidget";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <LangProvider>
            <Header />
            <main className="min-h-screen bg-cream">{children}</main>
            <Footer />
            <ChatWidget />
            <WhatsAppButton />
        </LangProvider>
    );
}
