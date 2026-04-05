"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight, Star, CheckCircle, Globe, Zap, Users,
    Clock, BookOpen, Award, MessageSquare,
    ChevronDown, Sparkles,
    Video, Calendar, Shield, BarChart3,
} from "lucide-react";
import { courses, testimonials, blogPosts } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

/* ─ Scroll-reveal hook ─── */
function useReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
            { threshold: 0.1 }
        );
        obs.observe(el); return () => obs.disconnect();
    }, []);
    return ref;
}

/* ─ Animated counter ─── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
    const [n, setN] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return;
            const step = to / 60; let cur = 0;
            const t = setInterval(() => { cur += step; if (cur >= to) { setN(to); clearInterval(t); } else setN(Math.floor(cur)); }, 16);
            obs.unobserve(el);
        }, { threshold: .5 });
        obs.observe(el); return () => obs.disconnect();
    }, [to]);
    return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

/* ─ Stars ─── */
function Stars({ n }: { n: number }) {
    return (
        <div style={{ display: "flex", gap: 3 }}>
            {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={14} fill={i <= n ? "#F97316" : "none"} color={i <= n ? "#F97316" : "#CBD5E1"} />
            ))}
        </div>
    );
}

function FAQ({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div onClick={() => setOpen(!open)} style={{ borderRadius: 16, border: "1.5px solid", borderColor: open ? "rgba(79,70,229,.3)" : "rgba(100,116,139,.12)", background: open ? "rgba(79,70,229,.02)" : "#fff", cursor: "pointer", overflow: "hidden", transition: "all .2s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px" }}>
                <p style={{ fontWeight: 600, color: "#1E1E2E", fontSize: ".9375rem", flex: 1, marginRight: 16 }}>{q}</p>
                <ChevronDown size={18} color="#64748B" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .25s", flexShrink: 0 }} />
            </div>
            {open && <div style={{ padding: "0 24px 20px" }}><p style={{ color: "#64748B", lineHeight: 1.75, fontSize: ".875rem" }}>{a}</p></div>}
        </div>
    );
}

/* ═══ MAIN ═════════════════════════════════════════ */
export default function HomePage() {
    const { lang, tr } = useLang();
    const r2 = useReveal(), r3 = useReveal(), r4 = useReveal(), r5 = useReveal();
    const r6 = useReveal(), r7 = useReveal(), r8 = useReveal(), r9 = useReveal();

    const FAQS_I18N = lang === "en" ? [
        ["Is the first class really free?", "Yes! Your first 30-minute trial is completely free — no credit card required. Sign up and pick a time."],
        ["How much do classes cost?", "1:1 classes from $25/session. Group classes from $12. Packages of 5–20 save up to 20%."],
        ["What technology do I need?", "A device with a camera + internet. We use Zoom or Google Meet — both free to join."],
        ["Can I cancel or reschedule?", "Free cancellation/reschedule up to 24 hours before class. After that the session credit is used."],
        ["What levels do you teach?", "All levels A1 through C2. We'll assess your level during your free trial class."],
        ["Do you teach kids?", "Yes, for students aged 8+. Mention your child's age when booking so we plan age-appropriate material."],
    ] : [
        ["¿La primera clase es realmente gratis?", "¡Sí! Tu primera prueba de 30 minutos es completamente gratuita — sin tarjeta de crédito. Regístrate y elige un horario."],
        ["¿Cuánto cuestan las clases?", "Clases individuales desde $25/sesión. Clases grupales desde $12. Paquetes de 5–20 clases con hasta un 20% de descuento."],
        ["¿Qué tecnología necesito?", "Un dispositivo con cámara + internet. Usamos Zoom o Google Meet — ambos gratuitos."],
        ["¿Puedo cancelar o reagendar?", "Cancelación o reagendación gratuita hasta 24 horas antes de la clase. Después se usa el crédito de sesión."],
        ["¿Qué niveles enseñáis?", "Todos los niveles de A1 a C2. Evaluaremos tu nivel durante tu clase de prueba gratuita."],
        ["¿Enseñáis a niños?", "Sí, a partir de 8 años. Menciona la edad de tu hijo al reservar para adaptar el material."],
    ];

    return (
        <div style={{ overflowX: "hidden" }}>

            {/* ══ HERO ══════════════════════════════════════════════════ */}
            <section style={{
                minHeight: "100svh", position: "relative", overflow: "hidden",
                background: "linear-gradient(145deg,#0D0D1F 0%,#1a1440 35%,#1E1040 60%,#0D0D1F 100%)",
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", padding: "100px 24px 60px", textAlign: "center",
            }}>
                {/* Animated blobs */}
                <div style={{ position: "absolute", top: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "rgba(79,70,229,.22)", filter: "blur(90px)", animation: "floatY 8s ease-in-out infinite", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 350, height: 350, borderRadius: "50%", background: "rgba(249,115,22,.16)", filter: "blur(80px)", animation: "floatY 10s ease-in-out infinite reverse", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "40%", right: "30%", width: 200, height: 200, borderRadius: "50%", background: "rgba(139,92,246,.14)", filter: "blur(60px)", animation: "floatY 12s ease-in-out infinite", pointerEvents: "none" }} />

                {/* Noise overlay */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity: .5, pointerEvents: "none" }} />

                {/* ── Badge ── */}
                <div className="anim-hero" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 9999, background: "rgba(79,70,229,.18)", border: "1px solid rgba(99,102,241,.35)", marginBottom: 28, fontSize: ".8rem", fontWeight: 700, color: "#A5B4FC", backdropFilter: "blur(10px)", letterSpacing: ".025em" }}>
                    <Sparkles size={14} color="#A5B4FC" /> {tr("hero.badge")}
                </div>

                {/* ── Headline ── */}
                <h1 className="anim-hero-1" style={{ color: "#FFFFFF", lineHeight: 1.1, marginBottom: 24, maxWidth: 820, fontWeight: 400, position: "relative" }}>
                    {lang === "en" ? (
                        <>Speak{" "}<span style={{ background: "linear-gradient(135deg,#818CF8 0%,#A78BFA 40%,#F97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>English &amp; Spanish</span><br />with Real Confidence</>
                    ) : (
                        <>Habla{" "}<span style={{ background: "linear-gradient(135deg,#818CF8 0%,#A78BFA 40%,#F97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>inglés y español</span><br />con verdadera confianza</>
                    )}
                </h1>

                {/* ── Sub ── */}
                <p className="anim-hero-2" style={{ color: "rgba(255,255,255,.55)", fontSize: "clamp(1rem,2.2vw,1.2rem)", maxWidth: 540, lineHeight: 1.8, marginBottom: 40 }}>
                    {tr("hero.sub")}
                </p>

                {/* ── CTAs ── */}
                <div className="anim-hero-3" style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 52 }}>
                    <Link href="/sign-up" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "15px 34px", background: "linear-gradient(135deg,#4F46E5,#6366F1)", color: "#fff", fontWeight: 700, fontSize: "1.0625rem", borderRadius: 12, textDecoration: "none", boxShadow: "0 4px 24px rgba(79,70,229,.5)", transition: "transform .15s, box-shadow .2s", whiteSpace: "nowrap" }}>
                        {tr("hero.cta1")} <ArrowRight size={18} />
                    </Link>
                    <Link href="/courses" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "14px 28px", background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.85)", fontWeight: 600, fontSize: "1.0625rem", borderRadius: 12, textDecoration: "none", border: "1px solid rgba(255,255,255,.15)", backdropFilter: "blur(10px)", whiteSpace: "nowrap" }}>
                        <Globe size={16} /> {tr("hero.cta2")}
                    </Link>
                </div>

                {/* ── Trust badges ── */}
                <div className="anim-hero-3" style={{ display: "flex", flexWrap: "wrap", gap: "10px 24px", justifyContent: "center", marginBottom: 56 }}>
                    {(["hero.trust1", "hero.trust2", "hero.trust3", "hero.trust4"] as const).map(k => (
                        <span key={k} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: ".82rem", color: "rgba(255,255,255,.45)", fontWeight: 500 }}>
                            <CheckCircle size={13} color="#818CF8" /> {tr(k)}
                        </span>
                    ))}
                </div>

                {/* ── Feature mini-cards ── */}
                <div className="anim-hero-3" style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", maxWidth: 760 }}>
                    {[
                        { icon: Video, lk: "hero.feat1", nk: "hero.feat1n" },
                        { icon: Calendar, lk: "hero.feat2", nk: "hero.feat2n" },
                        { icon: Users, lk: "hero.feat3", nk: "hero.feat3n" },
                        { icon: Shield, lk: "hero.feat4", nk: "hero.feat4n" },
                    ].map(({ icon: Icon, lk, nk }) => (
                        <div key={lk} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", background: "rgba(255,255,255,.05)", borderRadius: 14, border: "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(10px)", minWidth: 160 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(79,70,229,.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <Icon size={16} color="#818CF8" />
                            </div>
                            <div style={{ textAlign: "left" }}>
                                <p style={{ color: "rgba(255,255,255,.9)", fontSize: ".8rem", fontWeight: 700 }}>{tr(lk)}</p>
                                <p style={{ color: "rgba(255,255,255,.35)", fontSize: ".72rem" }}>{tr(nk)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scroll cue */}
                <div className="anim-bounce" style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,.2)" }}>
                    <ChevronDown size={24} />
                </div>
            </section>

            {/* ══ STATS ════════════════════════════════════════════════ */}
            <section style={{ background: "#fff", borderBottom: "1px solid rgba(100,116,139,.08)" }}>
                <div ref={r2} className="fade-up container-max" style={{ padding: "44px 24px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: "24px 16px", textAlign: "center" }}>
                        {[
                            { to: 500, suffix: "+", lk: "stats.students", color: "#4F46E5" },
                            { to: 1200, suffix: "+", lk: "stats.classes", color: "#F97316" },
                            { to: 12, suffix: "", lk: "stats.countries", color: "#10B981" },
                            { to: 4.9, suffix: "★", lk: "stats.rating", color: "#F59E0B" },
                        ].map(({ to, suffix, lk, color }) => (
                            <div key={lk} style={{ padding: "8px 4px" }}>
                                <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2rem,4.5vw,2.8rem)", color, lineHeight: 1, marginBottom: 8 }}>
                                    <Counter to={to} suffix={suffix} />
                                </p>
                                <p style={{ color: "#64748B", fontSize: ".8rem", fontWeight: 600, letterSpacing: ".025em" }}>{tr(lk)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ HOW IT WORKS ═════════════════════════════════════════ */}
            <section className="section-padding" style={{ background: "#F8F9FF" }}>
                <div ref={r3} className="fade-up container-max">
                    <div style={{ textAlign: "center", marginBottom: 60 }}>
                        <span style={{ display: "inline-block", padding: "6px 18px", borderRadius: 9999, background: "rgba(79,70,229,.08)", color: "#4F46E5", fontSize: ".75rem", fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 16 }}>{tr("steps.badge")}</span>
                        <h2 className="section-title" style={{ marginBottom: 14 }}>{tr("steps.title")}</h2>
                        <p className="section-subtitle" style={{ maxWidth: 420, margin: "0 auto" }}>{tr("steps.sub")}</p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, position: "relative" }}>
                        {[
                            { n: "01", icon: BookOpen, tk: "steps.s1t", dk: "steps.s1d", col: "rgba(79,70,229,.08)", iconBg: "rgba(79,70,229,.15)", iconColor: "#4F46E5", accent: "#4F46E5" },
                            { n: "02", icon: Clock, tk: "steps.s2t", dk: "steps.s2d", col: "rgba(249,115,22,.07)", iconBg: "rgba(249,115,22,.15)", iconColor: "#F97316", accent: "#F97316" },
                            { n: "03", icon: Award, tk: "steps.s3t", dk: "steps.s3d", col: "rgba(16,185,129,.07)", iconBg: "rgba(16,185,129,.15)", iconColor: "#10B981", accent: "#10B981" },
                        ].map((step, i) => (
                            <div key={i} style={{ background: "#fff", borderRadius: 22, padding: "36px 32px", border: "1.5px solid", borderColor: "rgba(100,116,139,.1)", position: "relative", overflow: "hidden" }}>
                                <div style={{ position: "absolute", inset: 0, background: step.col, opacity: .6 }} />
                                <div style={{ position: "relative" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                                        <div style={{ width: 56, height: 56, borderRadius: 16, background: step.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <step.icon size={26} color={step.iconColor} />
                                        </div>
                                        <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: "3rem", color: `${step.accent}15`, fontWeight: 700, lineHeight: 1 }}>
                                            {step.n}
                                        </span>
                                    </div>
                                    <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.3rem", color: "#1E1E2E", marginBottom: 10 }}>{tr(step.tk)}</h3>
                                    <p style={{ color: "#64748B", fontSize: ".875rem", lineHeight: 1.75 }}>{tr(step.dk)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ FEATURED COURSES ══════════════════════════════════════ */}
            <section className="section-padding" style={{ background: "#fff" }}>
                <div ref={r4} className="fade-up container-max">
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16, marginBottom: 48 }}>
                        <div>
                            <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 9999, background: "rgba(249,115,22,.08)", color: "#D45A03", fontSize: ".72rem", fontWeight: 800, letterSpacing: ".09em", textTransform: "uppercase", marginBottom: 14 }}>{tr("courses.badge")}</span>
                            <h2 className="section-title" style={{ marginBottom: 6 }}>{tr("courses.title")}</h2>
                            <p className="section-subtitle">{tr("courses.sub")}</p>
                        </div>
                        <Link href="/courses" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 22px", background: "#fff", color: "#4F46E5", fontWeight: 700, fontSize: ".875rem", borderRadius: 10, textDecoration: "none", border: "2px solid #4F46E5", transition: "background .2s", whiteSpace: "nowrap" }}>
                            {tr("courses.viewall")} <ArrowRight size={15} />
                        </Link>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 22 }}>
                        {courses.map(c => (
                            <Link key={c.id} href={`/courses/${c.slug}`} style={{ textDecoration: "none" }}>
                                <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid rgba(100,116,139,.1)", overflow: "hidden", transition: "transform .25s, box-shadow .25s, border-color .25s", boxShadow: "0 2px 8px rgba(0,0,0,.05)" }}
                                    onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "translateY(-5px)"; d.style.boxShadow = "0 16px 40px rgba(79,70,229,.14)"; d.style.borderColor = "rgba(79,70,229,.25)"; }}
                                    onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "translateY(0)"; d.style.boxShadow = "0 2px 8px rgba(0,0,0,.05)"; d.style.borderColor = "rgba(100,116,139,.1)"; }}
                                >
                                    <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                                        <Image src={c.image_url} alt={c.title} fill sizes="(max-width:768px) 100vw, 320px" style={{ objectFit: "cover" }} />
                                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,15,26,.9) 0%, rgba(15,15,26,.15) 60%, transparent 100%)" }} />
                                        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
                                            <span style={{ padding: "4px 10px", borderRadius: 9999, fontSize: ".68rem", fontWeight: 700, background: c.format === "group" ? "rgba(249,115,22,.9)" : "rgba(79,70,229,.9)", color: "#fff" }}>
                                                {c.format === "group" ? "Group" : "1:1"}
                                            </span>
                                            <span style={{ padding: "4px 10px", borderRadius: 9999, fontSize: ".68rem", fontWeight: 700, background: "rgba(255,255,255,.15)", backdropFilter: "blur(6px)", color: "#fff", border: "1px solid rgba(255,255,255,.2)" }}>
                                                {c.level}
                                            </span>
                                        </div>
                                        <div style={{ position: "absolute", bottom: 14, left: 14, right: 14 }}>
                                            <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.2rem", color: "#fff", lineHeight: 1.25, marginBottom: 4 }}>{c.title}</p>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <Stars n={Math.round(c.rating)} />
                                                <span style={{ color: "rgba(255,255,255,.7)", fontSize: ".75rem" }}>{c.rating} · {c.students_count} {tr("card.students")}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ padding: "16px 18px" }}>
                                        <p style={{ color: "#64748B", fontSize: ".82rem", lineHeight: 1.65, marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.tagline}</p>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div style={{ display: "flex", gap: 12 }}>
                                                <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#94A3B8", fontSize: ".76rem" }}><Clock size={11} /> {c.duration_minutes}min</span>
                                                <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#94A3B8", fontSize: ".76rem" }}><Globe size={11} /> {c.language}</span>
                                            </div>
                                            <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.1rem", color: "#4F46E5", fontWeight: 700 }}>{formatPrice(c.price_cents)}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ WHY US (feature grid) ════════════════════════════════ */}
            <section className="section-padding" style={{ background: "#0F0F1A" }}>
                <div ref={r5} className="fade-up container-max">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 32, alignItems: "center" }}>
                        <div>
                            <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 9999, background: "rgba(99,102,241,.15)", color: "#818CF8", fontSize: ".72rem", fontWeight: 800, letterSpacing: ".09em", textTransform: "uppercase", marginBottom: 18 }}>{tr("why.badge")}</span>
                            <h2 style={{ fontFamily: "'DM Serif Display',serif", color: "#fff", marginBottom: 16, lineHeight: 1.15 }}>{tr("why.title")}</h2>
                            <p style={{ color: "rgba(255,255,255,.5)", lineHeight: 1.8, fontSize: ".9375rem", marginBottom: 32 }}>
                                {tr("why.sub")}
                            </p>
                            <Link href="/sign-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "linear-gradient(135deg,#4F46E5,#6366F1)", color: "#fff", fontWeight: 700, borderRadius: 11, textDecoration: "none", boxShadow: "0 4px 20px rgba(79,70,229,.4)", fontSize: ".9375rem" }}>
                                {tr("why.cta")} <Zap size={15} />
                            </Link>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                            {[
                                { icon: Video, tk: "why.f1t", dk: "why.f1d", bg: "rgba(79,70,229,.12)", border: "rgba(79,70,229,.2)", ic: "#818CF8" },
                                { icon: BarChart3, tk: "why.f2t", dk: "why.f2d", bg: "rgba(16,185,129,.1)", border: "rgba(16,185,129,.2)", ic: "#34D399" },
                                { icon: Shield, tk: "why.f3t", dk: "why.f3d", bg: "rgba(249,115,22,.1)", border: "rgba(249,115,22,.2)", ic: "#FB923C" },
                                { icon: Globe, tk: "why.f4t", dk: "why.f4d", bg: "rgba(168,85,247,.1)", border: "rgba(168,85,247,.2)", ic: "#C084FC" },
                            ].map(({ icon: Icon, tk, dk, bg, border, ic }) => (
                                <div key={tk} style={{ borderRadius: 16, padding: "20px 18px", background: bg, border: `1px solid ${border}` }}>
                                    <div style={{ width: 38, height: 38, borderRadius: 10, background: `${ic}20`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                                        <Icon size={18} color={ic} />
                                    </div>
                                    <p style={{ color: "rgba(255,255,255,.9)", fontWeight: 700, fontSize: ".85rem", marginBottom: 6 }}>{tr(tk)}</p>
                                    <p style={{ color: "rgba(255,255,255,.4)", fontSize: ".78rem", lineHeight: 1.6 }}>{tr(dk)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ TESTIMONIALS ══════════════════════════════════════════ */}
            <section className="section-padding" style={{ background: "#F8F9FF" }}>
                <div ref={r6} className="fade-up container-max">
                    <div style={{ textAlign: "center", marginBottom: 52 }}>
                        <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 9999, background: "rgba(79,70,229,.07)", color: "#4F46E5", fontSize: ".72rem", fontWeight: 800, letterSpacing: ".09em", textTransform: "uppercase", marginBottom: 14 }}>{tr("test.badge")}</span>
                        <h2 className="section-title" style={{ marginBottom: 8 }}>{tr("test.title")}</h2>
                        <p className="section-subtitle">{tr("test.sub")}</p>
                    </div>

                    {/* Cards */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
                        {testimonials.map((t, i) => (
                            <div key={i} style={{ background: "#fff", borderRadius: 20, padding: "28px 26px", border: "1.5px solid rgba(100,116,139,.1)", boxShadow: "0 2px 12px rgba(0,0,0,.04)", position: "relative" }}>
                                <div style={{ position: "absolute", top: 20, right: 22, opacity: .1 }}>
                                    <svg width="32" height="26" fill="#4F46E5" viewBox="0 0 32 26"><path d="M0 26V16.133C0 6.378 5.689 1.222 17.067 0l1.6 3.2c-3.556.978-6.045 2.4-7.467 4.267C9.778 9.333 9.067 11.6 9.067 14.4H14V26H0zm18 0V16.133C18 6.378 23.689 1.222 35.067 0l1.6 3.2c-3.556.978-6.045 2.4-7.467 4.267C27.778 9.333 27.067 11.6 27.067 14.4H32V26H18z" /></svg>
                                </div>
                                <Stars n={t.rating} />
                                <p style={{ color: "#374151", lineHeight: 1.8, margin: "14px 0 20px", fontSize: ".875rem", fontStyle: "italic" }}>
                                    &ldquo;{t.comment}&rdquo;
                                </p>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#4F46E5,#818CF8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "1rem" }}>
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 700, color: "#1E1E2E", fontSize: ".875rem" }}>{t.name}</p>
                                        <p style={{ color: "#94A3B8", fontSize: ".76rem" }}>{t.country} · {t.course}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ BLOG ═════════════════════════════════════════════════ */}
            <section className="section-padding" style={{ background: "#fff" }}>
                <div ref={r7} className="fade-up container-max">
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 14, marginBottom: 44 }}>
                        <div>
                            <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 9999, background: "rgba(79,70,229,.07)", color: "#4F46E5", fontSize: ".72rem", fontWeight: 800, letterSpacing: ".09em", textTransform: "uppercase", marginBottom: 14 }}>{tr("blog.badge")}</span>
                            <h2 className="section-title">{tr("blog.title")}</h2>
                        </div>
                        <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#4F46E5", fontWeight: 700, fontSize: ".875rem", textDecoration: "none" }}>
                            {tr("blog.viewall")} <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 22 }}>
                        {blogPosts.map(post => (
                            <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                                <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid rgba(100,116,139,.1)", overflow: "hidden", transition: "transform .25s, box-shadow .25s", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}
                                    onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "translateY(-4px)"; d.style.boxShadow = "0 12px 32px rgba(79,70,229,.12)"; }}
                                    onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "translateY(0)"; d.style.boxShadow = "0 2px 8px rgba(0,0,0,.04)"; }}
                                >
                                    <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                                        <Image src={post.cover_image_url} alt={post.title} fill sizes="(max-width:768px) 100vw, 300px" style={{ objectFit: "cover" }} />
                                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,15,26,.4), transparent 60%)" }} />
                                    </div>
                                    <div style={{ padding: "18px 20px 20px" }}>
                                        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                                            {post.tags.slice(0, 2).map(t => <span key={t} style={{ padding: "3px 10px", borderRadius: 9999, fontSize: ".68rem", fontWeight: 700, background: "rgba(79,70,229,.07)", color: "#4F46E5" }}>{t}</span>)}
                                        </div>
                                        <p style={{ fontFamily: "'DM Serif Display',serif", color: "#1E1E2E", lineHeight: 1.35, marginBottom: 8, fontSize: "1rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.title}</p>
                                        <p style={{ color: "#64748B", fontSize: ".8rem", lineHeight: 1.65, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 14 }}>{post.excerpt}</p>
                                        <span style={{ color: "#94A3B8", fontSize: ".75rem", display: "flex", alignItems: "center", gap: 5 }}><Clock size={12} /> {post.reading_time} min read</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ FAQ ══════════════════════════════════════════════════ */}
            <section className="section-padding" style={{ background: "#F8F9FF" }}>
                <div ref={r8} className="fade-up container-max">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 48, alignItems: "start" }}>
                        <div style={{ position: "sticky", top: 88 }}>
                            <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 9999, background: "rgba(79,70,229,.07)", color: "#4F46E5", fontSize: ".72rem", fontWeight: 800, letterSpacing: ".09em", textTransform: "uppercase", marginBottom: 18 }}>{tr("faq.badge")}</span>
                            <h2 className="section-title" style={{ marginBottom: 14 }}>{tr("faq.title")}</h2>
                            <p className="section-subtitle" style={{ marginBottom: 28 }}>{tr("faq.sub")}</p>
                            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "12px 22px", background: "#fff", color: "#4F46E5", fontWeight: 700, borderRadius: 10, textDecoration: "none", border: "2px solid rgba(79,70,229,.2)", fontSize: ".875rem" }}>
                                <MessageSquare size={15} /> {tr("faq.ask")}
                            </Link>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {FAQS_I18N.map(([q, a]) => <FAQ key={q} q={q} a={a} />)}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ CTA BANNER ═══════════════════════════════════════════ */}
            <section ref={r9} className="fade-up" style={{
                padding: "100px 24px",
                background: "linear-gradient(145deg, #0D0D1F 0%, #1a1440 40%, #2D1A3E 100%)",
                position: "relative", overflow: "hidden", textAlign: "center",
            }}>
                <div style={{ position: "absolute", top: -80, left: "20%", width: 400, height: 400, borderRadius: "50%", background: "rgba(79,70,229,.2)", filter: "blur(100px)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -60, right: "15%", width: 320, height: 320, borderRadius: "50%", background: "rgba(249,115,22,.15)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div className="container-max" style={{ position: "relative" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 18px", borderRadius: 9999, background: "rgba(99,102,241,.15)", border: "1px solid rgba(99,102,241,.3)", marginBottom: 24, fontSize: ".8rem", fontWeight: 700, color: "#A5B4FC" }}>
                        <Sparkles size={13} /> {tr("cta.badge")}
                    </div>
                    <h2 style={{ fontFamily: "'DM Serif Display',serif", color: "#fff", fontSize: "clamp(2rem,5vw,3.25rem)", marginBottom: 16, lineHeight: 1.12 }}>
                        {tr("cta.title")}
                    </h2>
                    <p style={{ color: "rgba(255,255,255,.55)", fontSize: "1.0625rem", maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.8 }}>
                        {tr("cta.sub")}
                    </p>
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
                        <Link href="/sign-up" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "15px 36px", background: "linear-gradient(135deg,#4F46E5,#6366F1)", color: "#fff", fontWeight: 700, fontSize: "1.0625rem", borderRadius: 12, textDecoration: "none", boxShadow: "0 6px 28px rgba(79,70,229,.5)", whiteSpace: "nowrap" }}>
                            <Zap size={17} /> {tr("cta.main")}
                        </Link>
                        <Link href="/courses" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.85)", fontWeight: 600, fontSize: "1rem", borderRadius: 12, textDecoration: "none", border: "1px solid rgba(255,255,255,.15)", backdropFilter: "blur(10px)", whiteSpace: "nowrap" }}>
                            {tr("cta.browse")} <ArrowRight size={15} />
                        </Link>
                    </div>
                    <p style={{ color: "rgba(255,255,255,.25)", fontSize: ".8rem", marginTop: 20 }}>{tr("cta.note")}</p>
                </div>
            </section>

        </div>
    );
}
