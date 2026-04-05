"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Eye, EyeOff, ArrowRight, Star, CheckCircle, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";

const GOOGLE_ICON = (
    <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

export default function SignInPage() {
    const { lang, tr } = useLang();
    const [email, setEmail] = useState("tahirsadri07@gmail.com");
    const [pass, setPass] = useState("12345678");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 1800);
    };

    const features = lang === "en"
        ? ["Free 30-min trial class", "No contracts or commitments", "Tutors in every timezone", "All levels from A1 to C2"]
        : ["Clase de prueba gratuita de 30 min", "Sin contratos ni compromisos", "Tutores en todos los husos horarios", "Todos los niveles de A1 a C2"];

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", minHeight: "100vh" }} className="auth-grid">

            {/* ── Left: Form Panel ── */}
            <div style={{ background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", minHeight: "100vh" }}>
                <div style={{ width: "100%", maxWidth: 420 }}>
                    {/* Logo */}
                    <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 40 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#4F46E5,#F97316)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(79,70,229,.3)" }}>
                            <BookOpen size={17} color="#fff" strokeWidth={2.2} />
                        </div>
                        <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.2rem", color: "#1E1E2E" }}>
                            Lingua<span style={{ color: "#4F46E5" }}>Connect</span>
                        </span>
                    </Link>

                    <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "2.25rem", color: "#1E1E2E", marginBottom: 8, lineHeight: 1.15 }}>
                        {tr("signin.title")}
                    </h1>
                    <p style={{ color: "#64748B", fontSize: ".9375rem", marginBottom: 32 }}>
                        {tr("signin.sub")}
                    </p>

                    {/* Google */}
                    <button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "13px 20px", borderRadius: 12, border: "1.5px solid rgba(100,116,139,.2)", background: "#fff", cursor: "pointer", fontWeight: 600, color: "#1E1E2E", fontSize: ".9375rem", transition: "border-color .2s, box-shadow .2s", marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = "#4F46E5")}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(100,116,139,.2)")}
                    >
                        {GOOGLE_ICON} {tr("signin.google")}
                    </button>

                    {/* Divider */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                        <div style={{ flex: 1, height: 1, background: "rgba(100,116,139,.15)" }} />
                        <span style={{ fontSize: ".78rem", color: "#94A3B8", fontWeight: 500 }}>{tr("signin.orEmail")}</span>
                        <div style={{ flex: 1, height: 1, background: "rgba(100,116,139,.15)" }} />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div>
                            <label style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>{tr("signin.email")}</label>
                            <input
                                type="email" value={email} onChange={e => setEmail(e.target.value)}
                                placeholder="hello@example.com"
                                style={{ width: "100%", padding: "13px 16px", borderRadius: 10, border: "1.5px solid rgba(100,116,139,.2)", outline: "none", fontSize: ".9375rem", color: "#1E1E2E", background: "#FAFAFA", transition: "border-color .2s, box-shadow .2s", fontFamily: "'DM Sans',sans-serif" }}
                                onFocus={e => { e.target.style.borderColor = "#4F46E5"; e.target.style.boxShadow = "0 0 0 4px rgba(79,70,229,.1)"; e.target.style.background = "#fff"; }}
                                onBlur={e => { e.target.style.borderColor = "rgba(100,116,139,.2)"; e.target.style.boxShadow = "none"; e.target.style.background = "#FAFAFA"; }}
                            />
                        </div>
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                <label style={{ fontSize: ".82rem", fontWeight: 600, color: "#374151" }}>{tr("signin.password")}</label>
                                <Link href="/forgot-password" style={{ fontSize: ".78rem", color: "#4F46E5", fontWeight: 600, textDecoration: "none" }}>{tr("signin.forgot")}</Link>
                            </div>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={show ? "text" : "password"} value={pass} onChange={e => setPass(e.target.value)}
                                    placeholder="••••••••"
                                    style={{ width: "100%", padding: "13px 48px 13px 16px", borderRadius: 10, border: "1.5px solid rgba(100,116,139,.2)", outline: "none", fontSize: ".9375rem", color: "#1E1E2E", background: "#FAFAFA", transition: "border-color .2s, box-shadow .2s", fontFamily: "'DM Sans',sans-serif" }}
                                    onFocus={e => { e.target.style.borderColor = "#4F46E5"; e.target.style.boxShadow = "0 0 0 4px rgba(79,70,229,.1)"; e.target.style.background = "#fff"; }}
                                    onBlur={e => { e.target.style.borderColor = "rgba(100,116,139,.2)"; e.target.style.boxShadow = "none"; e.target.style.background = "#FAFAFA"; }}
                                />
                                <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8", display: "flex" }}>
                                    {show ? <EyeOff size={17} /> : <Eye size={17} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, padding: "14px", borderRadius: 11, border: "none", background: loading ? "rgba(79,70,229,.6)" : "linear-gradient(135deg,#4F46E5,#6366F1)", color: "#fff", fontWeight: 700, fontSize: "1rem", cursor: loading ? "default" : "pointer", boxShadow: "0 4px 18px rgba(79,70,229,.35)", transition: "opacity .2s", marginTop: 4 }}>
                            {loading ? (
                                <><div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} /> {tr("signin.loading")}</>
                            ) : (
                                <> {tr("signin.btn")} <ArrowRight size={16} /></>
                            )}
                        </button>
                    </form>

                    <p style={{ textAlign: "center", color: "#64748B", fontSize: ".875rem", marginTop: 28 }}>
                        {tr("signin.noAccount")}{" "}
                        <Link href="/sign-up" style={{ color: "#4F46E5", fontWeight: 700, textDecoration: "none" }}>{tr("signin.signupFree")}</Link>
                    </p>

                    <div style={{ marginTop: 32, padding: "16px 20px", borderRadius: 12, background: "rgba(79,70,229,.05)", border: "1px solid rgba(79,70,229,.1)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <Sparkles size={16} color="#4F46E5" style={{ flexShrink: 0, marginTop: 1 }} />
                        <p style={{ fontSize: ".8rem", color: "#4F46E5", fontWeight: 500, lineHeight: 1.6 }}>
                            {tr("signin.trialNote")}
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Right: Visual Panel ── */}
            <div style={{ background: "linear-gradient(145deg,#0D0D1F 0%,#1a1440 50%,#2D1A40 100%)", display: "none", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 52px", position: "relative", overflow: "hidden" }} className="auth-right-panel">
                <div style={{ position: "absolute", top: -80, left: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(79,70,229,.2)", filter: "blur(80px)" }} />
                <div style={{ position: "absolute", bottom: -60, right: -40, width: 260, height: 260, borderRadius: "50%", background: "rgba(249,115,22,.15)", filter: "blur(70px)" }} />

                <div style={{ position: "relative", maxWidth: 380 }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 9999, background: "rgba(99,102,241,.15)", border: "1px solid rgba(99,102,241,.3)", marginBottom: 24, fontSize: ".75rem", fontWeight: 700, color: "#A5B4FC", letterSpacing: ".06em" }}>
                            <Sparkles size={12} /> {tr("signin.brand.trust")}
                        </div>
                        <h2 style={{ fontFamily: "'DM Serif Display',serif", color: "#fff", fontSize: "2rem", lineHeight: 1.2, marginBottom: 16 }}>
                            {tr("signin.brand.title")}
                        </h2>
                        <p style={{ color: "rgba(255,255,255,.5)", lineHeight: 1.75, fontSize: ".9rem" }}>
                            {tr("signin.brand.sub")}
                        </p>
                    </div>

                    {/* Testimonial card */}
                    <div style={{ background: "rgba(255,255,255,.06)", borderRadius: 18, border: "1px solid rgba(255,255,255,.1)", padding: "26px 24px", backdropFilter: "blur(10px)", marginBottom: 32 }}>
                        <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#F97316" color="#F97316" />)}
                        </div>
                        <p style={{ color: "rgba(255,255,255,.8)", fontStyle: "italic", lineHeight: 1.75, fontSize: ".875rem", marginBottom: 18 }}>
                            &ldquo;LinguaConnect changed everything. In 3 months I went from broken English to confidently presenting at work. My tutor made it feel effortless.&rdquo;
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#4F46E5,#818CF8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: ".95rem" }}>A</div>
                            <div>
                                <p style={{ color: "#fff", fontWeight: 600, fontSize: ".85rem" }}>Amara Diallo</p>
                                <p style={{ color: "rgba(255,255,255,.4)", fontSize: ".76rem" }}>Product Manager, Paris</p>
                            </div>
                        </div>
                    </div>

                    {features.map(f => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                            <CheckCircle size={15} color="#34D399" />
                            <span style={{ color: "rgba(255,255,255,.65)", fontSize: ".85rem" }}>{f}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 900px) {
          .auth-grid { grid-template-columns: 1fr 1fr !important; }
          .auth-right-panel { display: flex !important; }
        }
      `}</style>
        </div>
    );
}
