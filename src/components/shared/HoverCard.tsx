"use client";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Course } from "@/lib/data";

export function HoverCard({ c }: { c: Course }) {
    return (
        <div
            style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1.5px solid rgba(100,116,139,.1)", transition: "transform .25s, box-shadow .25s" }}
            onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "translateY(-4px)"; d.style.boxShadow = "0 12px 32px rgba(79,70,229,.13)"; }}
            onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "translateY(0)"; d.style.boxShadow = "none"; }}
        >
            <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
                <Image src={c.image_url} alt={c.title} fill sizes="300px" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,15,26,.8) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 10, left: 12 }}>
                    <p style={{ fontFamily: "'DM Serif Display',serif", color: "#fff", fontSize: "1rem", lineHeight: 1.25 }}>{c.title}</p>
                </div>
            </div>
            <div style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 3 }}>
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={11} fill={i <= Math.round(c.rating) ? "#F97316" : "none"} color={i <= Math.round(c.rating) ? "#F97316" : "#CBD5E1"} />)}
                    <span style={{ color: "#64748B", fontSize: ".75rem", marginLeft: 4 }}>{c.rating}</span>
                </div>
                <span style={{ fontFamily: "'DM Serif Display',serif", color: "#4F46E5", fontWeight: 700, fontSize: "1rem" }}>{formatPrice(c.price_cents)}</span>
            </div>
        </div>
    );
}
