"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen, Search, Sparkles, TrendingUp, Zap } from "lucide-react";
import { blogPosts } from "@/lib/data";

/* ── Tag colour map ── */
const TAG_COLORS: Record<string, { bg: string; color: string }> = {
    "English": { bg: "rgba(79,70,229,.1)", color: "#4F46E5" },
    "Speaking Tips": { bg: "rgba(79,70,229,.1)", color: "#4F46E5" },
    "Fluency": { bg: "rgba(16,185,129,.1)", color: "#059669" },
    "Learning": { bg: "rgba(249,115,22,.1)", color: "#D45A03" },
    "Technology": { bg: "rgba(168,85,247,.1)", color: "#7C3AED" },
    "Advice": { bg: "rgba(249,115,22,.1)", color: "#D45A03" },
    "Business English": { bg: "rgba(239,68,68,.08)", color: "#DC2626" },
    "Phrases": { bg: "rgba(20,184,166,.1)", color: "#0F766E" },
    "Professional": { bg: "rgba(245,158,11,.1)", color: "#B45309" },
};
const DEFAULT_TAG = { bg: "rgba(100,116,139,.1)", color: "#64748B" };

function TagPill({ tag, small }: { tag: string; small?: boolean }) {
    const c = TAG_COLORS[tag] ?? DEFAULT_TAG;
    return (
        <span style={{
            display: "inline-block", padding: small ? "3px 10px" : "4px 12px",
            borderRadius: 9999, fontSize: small ? ".68rem" : ".72rem",
            fontWeight: 700, background: c.bg, color: c.color,
        }}>{tag}</span>
    );
}

/* ── Derive all unique tags from data ── */
const ALL_TAGS = ["All", ...Array.from(new Set(blogPosts.flatMap(p => p.tags)))];

/* ── Format date ── */
function fmtDate(d: string) {
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/* ═══ MAIN ═════════════════════════════════════════ */
export default function BlogPage() {
    const [activeTag, setActiveTag] = useState("All");
    const [query, setQuery] = useState("");

    const featured = blogPosts[0];
    const rest = blogPosts.slice(1);

    const filtered = (activeTag === "All" ? rest : rest.filter(p => p.tags.includes(activeTag)))
        .filter(p => !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase()));

    return (
        <div style={{ background: "#F8F9FF", minHeight: "100vh" }}>

            {/* ══ HERO ══════════════════════════════════════════════════ */}
            <section style={{
                background: "linear-gradient(145deg,#0D0D1F 0%,#1a1440 40%,#1E1040 70%,#0D0D1F 100%)",
                position: "relative", overflow: "hidden", paddingTop: 100,
                paddingBottom: 70, textAlign: "center",
            }}>
                {/* Blobs */}
                <div style={{ position: "absolute", top: -60, left: "10%", width: 380, height: 380, borderRadius: "50%", background: "rgba(79,70,229,.2)", filter: "blur(90px)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -40, right: "8%", width: 300, height: 300, borderRadius: "50%", background: "rgba(249,115,22,.14)", filter: "blur(80px)", pointerEvents: "none" }} />

                <div className="container-max" style={{ position: "relative", padding: "0 24px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 9999, background: "rgba(99,102,241,.15)", border: "1px solid rgba(99,102,241,.3)", marginBottom: 22, fontSize: ".75rem", fontWeight: 700, color: "#A5B4FC", letterSpacing: ".08em" }}>
                        <Sparkles size={12} color="#A5B4FC" /> THE LINGUACONNECT BLOG
                    </div>

                    <h1 style={{ fontFamily: "'DM Serif Display',serif", color: "#fff", fontSize: "clamp(2.4rem,5vw,3.5rem)", lineHeight: 1.1, marginBottom: 18, fontWeight: 400 }}>
                        Language Tips &amp;{" "}
                        <span style={{ background: "linear-gradient(135deg,#818CF8,#F97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            Student Stories
                        </span>
                    </h1>

                    <p style={{ color: "rgba(255,255,255,.5)", fontSize: "1.0625rem", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.8 }}>
                        Expert advice, evidence-backed strategies, and real results from students worldwide.
                    </p>

                    {/* Search bar */}
                    <div style={{ position: "relative", maxWidth: 480, margin: "0 auto" }}>
                        <Search size={16} color="#94A3B8" style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)" }} />
                        <input
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search articles…"
                            style={{
                                width: "100%", padding: "15px 20px 15px 48px", borderRadius: 14,
                                border: "1.5px solid rgba(255,255,255,.12)", outline: "none",
                                background: "rgba(255,255,255,.07)", backdropFilter: "blur(10px)",
                                color: "#fff", fontSize: ".9375rem", fontFamily: "'DM Sans',sans-serif",
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* ══ FEATURED POST ══════════════════════════════════════════ */}
            <section style={{ padding: "52px 0 0" }}>
                <div className="container-max" style={{ padding: "0 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                        <TrendingUp size={16} color="#4F46E5" />
                        <span style={{ fontSize: ".78rem", fontWeight: 800, color: "#4F46E5", letterSpacing: ".08em", textTransform: "uppercase" }}>Featured</span>
                    </div>

                    <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none", display: "block" }}>
                        <div style={{ borderRadius: 24, overflow: "hidden", background: "#fff", border: "1.5px solid rgba(100,116,139,.1)", boxShadow: "0 4px 24px rgba(0,0,0,.06)", display: "grid", gridTemplateColumns: "1fr", transition: "transform .3s, box-shadow .3s" }}
                            className="featured-card"
                            onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "translateY(-4px)"; d.style.boxShadow = "0 20px 60px rgba(79,70,229,.15)"; }}
                            onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = ""; d.style.boxShadow = "0 4px 24px rgba(0,0,0,.06)"; }}
                        >
                            {/* Image */}
                            <div style={{ position: "relative", height: 340, overflow: "hidden" }}>
                                <Image src={featured.cover_image_url} alt={featured.title} fill sizes="100vw" style={{ objectFit: "cover" }} />
                                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,15,26,.85) 0%, rgba(15,15,26,.2) 50%, transparent 100%)" }} />
                                <div style={{ position: "absolute", bottom: 28, left: 28, right: 28 }}>
                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                                        {featured.tags.map(t => <TagPill key={t} tag={t} />)}
                                    </div>
                                    <h2 style={{ fontFamily: "'DM Serif Display',serif", color: "#fff", fontSize: "clamp(1.5rem,3.5vw,2.25rem)", lineHeight: 1.2, marginBottom: 10 }}>
                                        {featured.title}
                                    </h2>
                                    <p style={{ color: "rgba(255,255,255,.65)", fontSize: ".9375rem", lineHeight: 1.75, marginBottom: 18, maxWidth: 680 }}>
                                        {featured.excerpt}
                                    </p>
                                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                                        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".8rem", color: "rgba(255,255,255,.45)", fontWeight: 500 }}>
                                            <Clock size={13} /> {featured.reading_time} min read
                                        </span>
                                        <span style={{ fontSize: ".8rem", color: "rgba(255,255,255,.35)" }}>{fmtDate(featured.published_at)}</span>
                                        <span style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 20px", borderRadius: 10, background: "rgba(79,70,229,.7)", backdropFilter: "blur(8px)", color: "#fff", fontWeight: 700, fontSize: ".875rem", marginLeft: "auto" }}>
                                            Read Article <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* ══ FILTER BAR + GRID ═══════════════════════════════════════ */}
            <section style={{ padding: "52px 0 80px" }}>
                <div className="container-max" style={{ padding: "0 24px" }}>

                    {/* Tag Filters */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
                        <span style={{ fontSize: ".78rem", fontWeight: 700, color: "#94A3B8", letterSpacing: ".06em", textTransform: "uppercase", marginRight: 4, flexShrink: 0 }}>Filter:</span>
                        {ALL_TAGS.map(tag => (
                            <button key={tag} onClick={() => setActiveTag(tag)} style={{
                                padding: "7px 18px", borderRadius: 9999, border: "1.5px solid",
                                fontWeight: 600, fontSize: ".8rem", cursor: "pointer",
                                transition: "all .18s",
                                borderColor: activeTag === tag ? "#4F46E5" : "rgba(100,116,139,.15)",
                                background: activeTag === tag ? "#4F46E5" : "#fff",
                                color: activeTag === tag ? "#fff" : "#64748B",
                                boxShadow: activeTag === tag ? "0 4px 14px rgba(79,70,229,.3)" : "none",
                            }}>
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "80px 0" }}>
                            <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.5rem", color: "#1E1E2E", marginBottom: 8 }}>No articles found</p>
                            <p style={{ color: "#64748B", fontSize: ".9rem" }}>Try a different search term or clear the filter.</p>
                        </div>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 24 }}>
                            {filtered.map(post => (
                                <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                                    <article style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1.5px solid rgba(100,116,139,.1)", boxShadow: "0 2px 10px rgba(0,0,0,.04)", transition: "transform .25s, box-shadow .25s, border-color .25s", height: "100%", display: "flex", flexDirection: "column" }}
                                        onMouseEnter={e => { const d = e.currentTarget as HTMLElement; d.style.transform = "translateY(-5px)"; d.style.boxShadow = "0 16px 48px rgba(79,70,229,.15)"; d.style.borderColor = "rgba(79,70,229,.2)"; }}
                                        onMouseLeave={e => { const d = e.currentTarget as HTMLElement; d.style.transform = ""; d.style.boxShadow = "0 2px 10px rgba(0,0,0,.04)"; d.style.borderColor = "rgba(100,116,139,.1)"; }}
                                    >
                                        {/* Card image */}
                                        <div style={{ position: "relative", height: 196, overflow: "hidden", flexShrink: 0 }}>
                                            <Image src={post.cover_image_url} alt={post.title} fill sizes="(max-width:768px) 100vw, 350px" style={{ objectFit: "cover", transition: "transform .5s" }} />
                                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,15,26,.5) 0%, transparent 60%)" }} />
                                            {/* Reading time badge */}
                                            <div style={{ position: "absolute", top: 14, right: 14, display: "flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: 9999, background: "rgba(15,15,26,.6)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.12)" }}>
                                                <Clock size={11} color="rgba(255,255,255,.8)" />
                                                <span style={{ fontSize: ".7rem", color: "rgba(255,255,255,.8)", fontWeight: 600 }}>{post.reading_time} min</span>
                                            </div>
                                        </div>

                                        {/* Card body */}
                                        <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                                            {/* Tags */}
                                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                                                {post.tags.slice(0, 2).map(t => <TagPill key={t} tag={t} small />)}
                                            </div>

                                            <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.1rem", color: "#1E1E2E", lineHeight: 1.4, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                                {post.title}
                                            </h3>

                                            <p style={{ color: "#64748B", fontSize: ".83rem", lineHeight: 1.75, marginBottom: 18, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", flex: 1 }}>
                                                {post.excerpt}
                                            </p>

                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(100,116,139,.1)", paddingTop: 14 }}>
                                                <span style={{ fontSize: ".76rem", color: "#94A3B8", fontWeight: 500 }}>{fmtDate(post.published_at)}</span>
                                                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: ".8rem", color: "#4F46E5", fontWeight: 700 }}>
                                                    Read more <ArrowRight size={13} />
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ══ NEWSLETTER CTA ══════════════════════════════════════════ */}
            <section style={{ background: "linear-gradient(135deg,#0D0D1F 0%,#1a1440 60%,#2D1A40 100%)", padding: "80px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -60, left: "20%", width: 350, height: 350, borderRadius: "50%", background: "rgba(79,70,229,.18)", filter: "blur(90px)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -40, right: "15%", width: 280, height: 280, borderRadius: "50%", background: "rgba(249,115,22,.12)", filter: "blur(80px)", pointerEvents: "none" }} />

                <div className="container-max" style={{ position: "relative", textAlign: "center", maxWidth: 560 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 9999, background: "rgba(99,102,241,.15)", border: "1px solid rgba(99,102,241,.3)", marginBottom: 22, fontSize: ".75rem", fontWeight: 700, color: "#A5B4FC" }}>
                        <Zap size={12} /> Want to improve faster?
                    </div>
                    <h2 style={{ fontFamily: "'DM Serif Display',serif", color: "#fff", fontSize: "clamp(1.8rem,4vw,2.5rem)", marginBottom: 14, lineHeight: 1.2 }}>
                        Book a Free 30-Minute Trial
                    </h2>
                    <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".9375rem", lineHeight: 1.8, marginBottom: 36 }}>
                        Reading helps — but speaking with a real tutor is what builds real fluency. Try it free, no commitment.
                    </p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/sign-up" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "14px 32px", background: "linear-gradient(135deg,#4F46E5,#6366F1)", color: "#fff", fontWeight: 700, fontSize: ".9375rem", borderRadius: 11, textDecoration: "none", boxShadow: "0 6px 24px rgba(79,70,229,.45)" }}>
                            <BookOpen size={16} /> Book Free Trial
                        </Link>
                        <Link href="/courses" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.8)", fontWeight: 600, fontSize: ".9375rem", borderRadius: 11, textDecoration: "none", border: "1px solid rgba(255,255,255,.14)", backdropFilter: "blur(10px)" }}>
                            Browse Courses <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
