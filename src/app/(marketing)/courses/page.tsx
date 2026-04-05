"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Search, Filter, Star, Users, Clock, ArrowRight,
    Globe, BookOpen, Zap, Check, SlidersHorizontal, X
} from "lucide-react";
import { courses } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const LANGUAGES = ["All", "English", "Spanish"];
const FORMATS = ["All", "1:1", "Group"];
const LEVELS = ["All", "A1", "A2", "B1", "B2", "C1", "C2"];

function Stars({ n }: { n: number }) {
    return (
        <div style={{ display: "flex", gap: 2 }}>
            {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={12} fill={i <= Math.round(n) ? "#F97316" : "none"} color={i <= Math.round(n) ? "#F97316" : "#CBD5E1"} />
            ))}
        </div>
    );
}

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button onClick={onClick} style={{
            padding: "8px 18px", borderRadius: 9999, fontSize: ".8375rem", fontWeight: 600,
            border: active ? "none" : "1.5px solid rgba(100,116,139,.2)",
            background: active ? "linear-gradient(135deg,#4F46E5,#6366F1)" : "#fff",
            color: active ? "#fff" : "#64748B",
            cursor: "pointer", transition: "all .2s",
            boxShadow: active ? "0 2px 10px rgba(79,70,229,.3)" : "none",
            whiteSpace: "nowrap",
        }}>
            {label}
        </button>
    );
}

export default function CoursesPage() {
    const [query, setQuery] = useState("");
    const [lang, setLang] = useState("All");
    const [fmt, setFmt] = useState("All");
    const [level, setLevel] = useState("All");
    const [showFilter, setShowFilter] = useState(false);

    const filtered = useMemo(() => {
        return courses.filter(c => {
            const q = query.toLowerCase();
            if (q && !c.title.toLowerCase().includes(q) && !c.tagline.toLowerCase().includes(q)) return false;
            if (lang !== "All" && c.language.toLowerCase() !== lang.toLowerCase()) return false;
            if (fmt !== "All") {
                if (fmt === "1:1" && c.format !== "one_on_one") return false;
                if (fmt === "Group" && c.format !== "group") return false;
            }
            if (level !== "All" && c.level !== level) return false;
            return true;
        });
    }, [query, lang, fmt, level]);

    const clearFilters = () => { setQuery(""); setLang("All"); setFmt("All"); setLevel("All"); };
    const hasFilters = lang !== "All" || fmt !== "All" || level !== "All" || query !== "";

    return (
        <div style={{ background: "#F8F9FF", minHeight: "100vh" }}>

            {/* ── Hero Banner ── */}
            <div style={{
                background: "linear-gradient(145deg,#1E1E2E 0%,#2D2B5C 45%,#1a1a3e 100%)",
                padding: "100px 24px 60px", position: "relative", overflow: "hidden",
            }}>
                {/* Decorative orbs */}
                <div style={{ position: "absolute", top: -60, right: -60, width: 320, height: 320, borderRadius: "50%", background: "rgba(99,102,241,.18)", filter: "blur(80px)" }} />
                <div style={{ position: "absolute", bottom: -40, left: "20%", width: 240, height: 240, borderRadius: "50%", background: "rgba(249,115,22,.12)", filter: "blur(60px)" }} />

                <div className="container-max" style={{ position: "relative", textAlign: "center" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 9999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", marginBottom: 20, fontSize: ".78rem", fontWeight: 700, color: "rgba(255,255,255,.75)", letterSpacing: ".06em" }}>
                        <Globe size={12} /> BROWSE ALL COURSES
                    </div>
                    <h1 style={{ fontFamily: "'DM Serif Display',serif", color: "#fff", lineHeight: 1.12, marginBottom: 18, fontWeight: 400, fontSize: "clamp(2.4rem,6vw,4rem)" }}>
                        Find Your <span style={{ background: "linear-gradient(90deg,#818CF8,#F97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Perfect Class</span>
                    </h1>
                    <p style={{ color: "rgba(255,255,255,.6)", fontSize: "1.0625rem", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.75 }}>
                        1:1 and group classes at every level in English and Spanish. Pick your schedule, your tutor, your pace.
                    </p>

                    {/* Search bar */}
                    <div style={{ maxWidth: 560, margin: "0 auto", position: "relative" }}>
                        <Search size={18} color="#94A3B8" style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)" }} />
                        <input
                            type="text" placeholder="Search courses (e.g. 'business English', 'beginners Spanish'…)"
                            value={query} onChange={e => setQuery(e.target.value)}
                            style={{
                                width: "100%", padding: "16px 52px 16px 52px",
                                borderRadius: 14, border: "none", outline: "none",
                                background: "rgba(255,255,255,.1)", color: "#fff",
                                fontSize: ".9375rem", backdropFilter: "blur(12px)",
                                caretColor: "#818CF8",
                            }}
                        />
                        <style>{`input::placeholder { color: rgba(255,255,255,.35); }`}</style>
                        {query && (
                            <button onClick={() => setQuery("")} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.5)", display: "flex" }}>
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Stats */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "center", marginTop: 32 }}>
                        {[
                            { label: "Courses", value: "4" },
                            { label: "Languages", value: "2" },
                            { label: "Active Students", value: "500+" },
                            { label: "Avg Rating", value: "4.9★" },
                        ].map(s => (
                            <div key={s.label} style={{ textAlign: "center" }}>
                                <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.4rem", color: "#fff", lineHeight: 1 }}>{s.value}</p>
                                <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)", marginTop: 2, textTransform: "uppercase", letterSpacing: ".06em" }}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Filter Bar ── */}
            <div style={{ background: "#fff", borderBottom: "1px solid rgba(100,116,139,.1)", position: "sticky", top: 68, zIndex: 40, boxShadow: "0 2px 16px rgba(0,0,0,.04)" }}>
                <div className="container-max" style={{ padding: "12px 24px" }}>
                    {/* Mobile toggle */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", flex: 1 }}>
                            {/* Language */}
                            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                                {LANGUAGES.map(l => <Pill key={l} label={l} active={lang === l} onClick={() => setLang(l)} />)}
                            </div>
                            <div style={{ width: 1, height: 28, background: "rgba(100,116,139,.15)", margin: "0 4px" }} />
                            {/* Format */}
                            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                                {FORMATS.map(f => <Pill key={f} label={f} active={fmt === f} onClick={() => setFmt(f)} />)}
                            </div>
                            <div style={{ width: 1, height: 28, background: "rgba(100,116,139,.15)", margin: "0 4px" }} />
                            {/* Levels */}
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                                {LEVELS.map(lv => <Pill key={lv} label={lv} active={level === lv} onClick={() => setLevel(lv)} />)}
                            </div>
                        </div>
                        {hasFilters && (
                            <button onClick={clearFilters} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".8rem", fontWeight: 600, color: "#EF4444", border: "none", background: "rgba(239,68,68,.07)", padding: "8px 14px", borderRadius: 8, cursor: "pointer", whiteSpace: "nowrap" }}>
                                <X size={14} /> Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="container-max" style={{ padding: "40px 24px 80px" }}>

                {/* Results header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
                    <div>
                        <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.75rem", color: "#1E1E2E" }}>
                            {filtered.length === courses.length ? "All Courses" : `${filtered.length} Result${filtered.length !== 1 ? "s" : ""}`}
                        </p>
                        <p style={{ color: "#94A3B8", fontSize: ".825rem", marginTop: 2 }}>
                            {filtered.length} courses available
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "8px 14px", background: "rgba(79,70,229,.07)", borderRadius: 8, fontSize: ".8rem", fontWeight: 600, color: "#4F46E5" }}>
                            <BookOpen size={13} /> Live classes
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "8px 14px", background: "rgba(16,185,129,.07)", borderRadius: 8, fontSize: ".8rem", fontWeight: 600, color: "#059669" }}>
                            <Zap size={13} /> Free trial
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                {filtered.length > 0 ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 24 }}>
                        {filtered.map(c => (
                            <Link key={c.id} href={`/courses/${c.slug}`} style={{ textDecoration: "none", display: "block" }}>
                                <div style={{
                                    background: "#fff", borderRadius: 20,
                                    boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 8px 24px rgba(79,70,229,.07)",
                                    overflow: "hidden", cursor: "pointer",
                                    transition: "transform .25s ease, box-shadow .25s ease",
                                }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(79,70,229,.15)"; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(0,0,0,.06), 0 8px 24px rgba(79,70,229,.07)"; }}
                                >
                                    {/* Image */}
                                    <div style={{ position: "relative", height: 210, overflow: "hidden" }}>
                                        <Image src={c.image_url} alt={c.title} fill sizes="(max-width:768px) 100vw, 350px" style={{ objectFit: "cover" }} />
                                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,15,26,.85) 0%, rgba(15,15,26,.2) 50%, transparent 100%)" }} />

                                        {/* Top badges */}
                                        <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 7 }}>
                                            <span style={{ padding: "4px 11px", borderRadius: 9999, fontSize: ".7rem", fontWeight: 700, background: "rgba(255,255,255,.15)", backdropFilter: "blur(8px)", color: "#fff", border: "1px solid rgba(255,255,255,.25)" }}>{c.level}</span>
                                            <span style={{ padding: "4px 11px", borderRadius: 9999, fontSize: ".7rem", fontWeight: 700, background: c.format === "group" ? "rgba(249,115,22,.85)" : "rgba(79,70,229,.85)", color: "#fff" }}>
                                                {c.format === "group" ? "Group" : "1:1"}
                                            </span>
                                        </div>

                                        {/* Price */}
                                        <div style={{ position: "absolute", top: 14, right: 14 }}>
                                            <div style={{ background: "rgba(255,255,255,.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.25)", borderRadius: 10, padding: "6px 12px", textAlign: "center" }}>
                                                <p style={{ color: "#fff", fontFamily: "'DM Serif Display',serif", fontSize: "1.15rem", lineHeight: 1 }}>{formatPrice(c.price_cents)}</p>
                                                <p style={{ color: "rgba(255,255,255,.65)", fontSize: ".65rem" }}>/ session</p>
                                            </div>
                                        </div>

                                        {/* Bottom title overlay */}
                                        <div style={{ position: "absolute", bottom: 14, left: 14, right: 14 }}>
                                            <p style={{ fontFamily: "'DM Serif Display',serif", color: "#fff", fontSize: "1.3rem", lineHeight: 1.25, textShadow: "0 1px 6px rgba(0,0,0,.4)" }}>{c.title}</p>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div style={{ padding: "18px 20px 20px" }}>
                                        <p style={{ color: "#64748B", fontSize: ".845rem", lineHeight: 1.65, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                            {c.tagline}
                                        </p>

                                        {/* Meta row */}
                                        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                                            {[
                                                { icon: Clock, label: `${c.duration_minutes} min` },
                                                { icon: Users, label: `${c.students_count} students` },
                                                { icon: Globe, label: c.language },
                                            ].map(({ icon: Icon, label }) => (
                                                <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, color: "#94A3B8", fontSize: ".78rem" }}>
                                                    <Icon size={12} /> {label}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Rating row */}
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid rgba(100,116,139,.1)" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                                <Stars n={c.rating} />
                                                <span style={{ fontWeight: 700, fontSize: ".8rem", color: "#1E1E2E" }}>{c.rating}</span>
                                                <span style={{ color: "#94A3B8", fontSize: ".75rem" }}>({c.reviews_count})</span>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#4F46E5", fontWeight: 700, fontSize: ".82rem" }}>
                                                View course <ArrowRight size={13} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: "center", padding: "80px 24px" }}>
                        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(79,70,229,.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                            <Search size={30} color="#818CF8" strokeWidth={1.5} />
                        </div>
                        <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.5rem", color: "#1E1E2E", marginBottom: 10 }}>No courses found</p>
                        <p style={{ color: "#94A3B8", marginBottom: 24 }}>Try adjusting your filters or search term.</p>
                        <button onClick={clearFilters} className="btn-primary" style={{ padding: "11px 24px", fontSize: ".875rem" }}>Clear All Filters</button>
                    </div>
                )}

                {/* CTA Section */}
                <div style={{
                    marginTop: 56, borderRadius: 24, overflow: "hidden",
                    background: "linear-gradient(145deg,#1E1E2E,#2D2B5C)",
                    padding: "52px 40px",
                    display: "flex", flexWrap: "wrap", alignItems: "center", gap: 28,
                    justifyContent: "space-between",
                    position: "relative",
                }}>
                    <div style={{ position: "absolute", top: -30, right: -30, width: 200, height: 200, borderRadius: "50%", background: "rgba(99,102,241,.2)", filter: "blur(50px)" }} />
                    <div style={{ position: "relative" }}>
                        <p style={{ fontFamily: "'DM Serif Display',serif", color: "#fff", fontSize: "clamp(1.4rem,3vw,2rem)", marginBottom: 8 }}>
                            Not sure which class is right for you?
                        </p>
                        <p style={{ color: "rgba(255,255,255,.55)", fontSize: ".9375rem" }}>
                            Book a free 30-min trial and we&apos;ll assess your level and recommend the perfect course.
                        </p>
                    </div>
                    <Link href="/sign-up" style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 30px", background: "linear-gradient(135deg,#4F46E5,#6366F1)", color: "#fff", fontWeight: 700, borderRadius: 12, textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(79,70,229,.5)", fontSize: ".9375rem" }}>
                        Book Free Trial <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
