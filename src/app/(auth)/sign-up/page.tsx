"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Eye, EyeOff, ArrowRight, CheckCircle, Sparkles, Globe } from "lucide-react";
import { useLang } from "@/lib/i18n";

const GOOGLE_ICON = (
    <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

export default function SignUpPage() {
    const { tr } = useLang();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputStyle = {
        width: "100%", padding: "13px 16px", borderRadius: 10,
        border: "1.5px solid rgba(100,116,139,.2)", outline: "none",
        fontSize: ".9375rem", color: "#1E1E2E", background: "#FAFAFA",
        transition: "border-color .2s, box-shadow .2s",
        fontFamily: "'DM Sans',sans-serif",
    };
    const focusStyle = { borderColor: "#4F46E5", boxShadow: "0 0 0 4px rgba(79,70,229,.1)", background: "#fff" };
    const blurStyle = { borderColor: "rgba(100,116,139,.2)", boxShadow: "none", background: "#FAFAFA" };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 1800);
    };

    const STEPS = [
        { n: 1, key: "signup.step1" },
        { n: 2, key: "signup.step2" },
        { n: 3, key: "signup.step3" },
        { n: 4, key: "signup.step4" },
    ];

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", minHeight: "100vh" }} className="auth-grid">

            {/* ── Left: Brand Panel ── */}
            <div style={{ background: "linear-gradient(145deg,#0D0D1F 0%,#1a1440 50%,#2D1A40 100%)", display: "none", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 52px", position: "relative", overflow: "hidden", order: -1 }} className="auth-right-panel">
                <div style={{ position: "absolute", top: -80, right: -60, width: 350, height: 350, borderRadius: "50%", background: "rgba(79,70,229,.18)", filter: "blur(80px)" }} />
                <div style={{ position: "absolute", bottom: -40, left: -40, width: 280, height: 280, borderRadius: "50%", background: "rgba(249,115,22,.13)", filter: "blur(70px)" }} />

                <div style={{ position: "relative", maxWidth: 380 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 9999, background: "rgba(249,115,22,.15)", border: "1px solid rgba(249,115,22,.3)", marginBottom: 24, fontSize: ".75rem", fontWeight: 700, color: "#FB923C", letterSpacing: ".06em" }}>
                        <Globe size={12} /> {tr("signup.brand.badge")}
                    </div>

                    <h2 style={{ fontFamily: "'DM Serif Display',serif", color: "#fff", fontSize: "2.1rem", lineHeight: 1.2, marginBottom: 16 }}>
                        {tr("signup.brand.title")}
                    </h2>
                    <p style={{ color: "rgba(255,255,255,.5)", lineHeight: 1.75, fontSize: ".9rem", marginBottom: 40 }}>
                        {tr("signup.brand.sub")}
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        {STEPS.map(({ n, key }) => (
                            <div key={key} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(79,70,229,.25)", border: "1px solid rgba(99,102,241,.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <span style={{ color: "#818CF8", fontWeight: 700, fontSize: ".8rem" }}>{n}</span>
                                </div>
                                <span style={{ color: "rgba(255,255,255,.7)", fontSize: ".875rem", lineHeight: 1.5 }}>{tr(key)}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 44, padding: "20px 22px", borderRadius: 16, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)" }}>
                        <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
                            {[...Array(5)].map((_, i) => <span key={i} style={{ fontSize: "1rem" }}>⭐</span>)}
                        </div>
                        <p style={{ color: "rgba(255,255,255,.7)", fontSize: ".82rem", lineHeight: 1.7, fontStyle: "italic" }}>
                            &ldquo;I passed my English interview in 60 days. LinguaConnect gave me the confidence I never had before.&rdquo;
                        </p>
                        <p style={{ color: "rgba(255,255,255,.4)", fontSize: ".75rem", marginTop: 10 }}>— Kenji M. · Tokyo, Japan</p>
                    </div>
                </div>
            </div>

            {/* ── Right: Form Panel ── */}
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

                    <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "2.15rem", color: "#1E1E2E", marginBottom: 6, lineHeight: 1.15 }}>
                        {tr("signup.title")}
                    </h1>
                    <p style={{ color: "#64748B", fontSize: ".9375rem", marginBottom: 30 }}>
                        {tr("signup.sub")}
                    </p>

                    {/* Google */}
                    <button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "13px 20px", borderRadius: 12, border: "1.5px solid rgba(100,116,139,.2)", background: "#fff", cursor: "pointer", fontWeight: 600, color: "#1E1E2E", fontSize: ".9375rem", transition: "border-color .2s, box-shadow .2s", marginBottom: 22, boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = "#4F46E5")}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(100,116,139,.2)")}
                    >
                        {GOOGLE_ICON} {tr("signup.google")}
                    </button>

                    {/* Divider */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                        <div style={{ flex: 1, height: 1, background: "rgba(100,116,139,.15)" }} />
                        <span style={{ fontSize: ".78rem", color: "#94A3B8", fontWeight: 500 }}>{tr("signup.orEmail")}</span>
                        <div style={{ flex: 1, height: 1, background: "rgba(100,116,139,.15)" }} />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <div>
                            <label style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>{tr("signup.name")}</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="…"
                                style={inputStyle} onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)} />
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>{tr("signup.email")}</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="hello@example.com"
                                style={inputStyle} onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)} />
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>{tr("signup.password")}</label>
                            <div style={{ position: "relative" }}>
                                <input type={show ? "text" : "password"} value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••"
                                    style={{ ...inputStyle, paddingRight: 48 }}
                                    onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)} />
                                <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8", display: "flex" }}>
                                    {show ? <EyeOff size={17} /> : <Eye size={17} />}
                                </button>
                            </div>
                        </div>

                        {pass.length > 0 && (
                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                {[["8+", pass.length >= 8], [/[A-Z]/.test(pass) ? "A–Z" : "A–Z", /[A-Z]/.test(pass)], [/\d/.test(pass) ? "123" : "123", /\d/.test(pass)]].map(([l, ok]) => (
                                    <span key={String(l)} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: ".72rem", color: ok ? "#059669" : "#94A3B8", fontWeight: 600 }}>
                                        <CheckCircle size={11} color={ok ? "#059669" : "#CBD5E1"} /> {l}
                                    </span>
                                ))}
                            </div>
                        )}

                        <button type="submit" disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, padding: "14px", borderRadius: 11, border: "none", background: loading ? "rgba(79,70,229,.6)" : "linear-gradient(135deg,#4F46E5,#6366F1)", color: "#fff", fontWeight: 700, fontSize: "1rem", cursor: loading ? "default" : "pointer", boxShadow: "0 4px 18px rgba(79,70,229,.35)", transition: "opacity .2s", marginTop: 6 }}>
                            {loading ? (
                                <><div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} /> {tr("signup.loading")}</>
                            ) : (
                                <> {tr("signup.btn")} <ArrowRight size={16} /></>
                            )}
                        </button>
                    </form>

                    <p style={{ fontSize: ".72rem", color: "#94A3B8", textAlign: "center", marginTop: 14, lineHeight: 1.7 }}>
                        {tr("signup.terms1")}{" "}
                        <Link href="/terms" style={{ color: "#4F46E5", fontWeight: 600, textDecoration: "none" }}>{tr("signup.termsLink")}</Link> {tr("signup.and")}{" "}
                        <Link href="/privacy" style={{ color: "#4F46E5", fontWeight: 600, textDecoration: "none" }}>{tr("signup.privLink")}</Link>.
                    </p>

                    <p style={{ textAlign: "center", color: "#64748B", fontSize: ".875rem", marginTop: 24 }}>
                        {tr("signup.already")}{" "}
                        <Link href="/sign-in" style={{ color: "#4F46E5", fontWeight: 700, textDecoration: "none" }}>{tr("signup.signinLink")}</Link>
                    </p>

                    <div style={{ marginTop: 28, padding: "16px 20px", borderRadius: 12, background: "linear-gradient(135deg,rgba(79,70,229,.06),rgba(249,115,22,.04))", border: "1px solid rgba(79,70,229,.12)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <Sparkles size={16} color="#4F46E5" style={{ flexShrink: 0, marginTop: 1 }} />
                        <p style={{ fontSize: ".8rem", color: "#374151", fontWeight: 500, lineHeight: 1.6 }}>
                            {tr("signup.trialNote")}
                        </p>
                    </div>
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
