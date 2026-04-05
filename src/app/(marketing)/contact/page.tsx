"use client";

import { useState } from "react";
import { Mail, Phone, Clock, MapPin, ArrowRight, CheckCircle, MessageCircle, Sparkles } from "lucide-react";

const INFO_CARDS = [
    { icon: Mail, title: "Email Us", body: "hello@linguaconnect.com", sub: "Reply within 2 hours", color: "#4F46E5", bg: "rgba(79,70,229,.08)" },
    { icon: Phone, title: "WhatsApp", body: "+1 (555) 000-1234", sub: "Mon–Sat 8AM–8PM EST", color: "#10B981", bg: "rgba(16,185,129,.08)" },
    { icon: Clock, title: "Office Hours", body: "Mon–Sat, 8AM–9PM", sub: "All major timezones", color: "#F97316", bg: "rgba(249,115,22,.08)" },
    { icon: MapPin, title: "We're online", body: "Serving 12 countries", sub: "No physical office needed", color: "#8B5CF6", bg: "rgba(139,92,246,.08)" },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }).catch(() => { });
        setLoading(false);
        setSent(true);
    };

    const inputStyle = { width: "100%", padding: "13px 16px", borderRadius: 10, border: "1.5px solid rgba(100,116,139,.18)", outline: "none", fontSize: ".9375rem", color: "#1E1E2E", background: "#FAFAFA", transition: "border-color .2s, box-shadow .2s", fontFamily: "'DM Sans',sans-serif" };
    const focus = { borderColor: "#4F46E5", boxShadow: "0 0 0 4px rgba(79,70,229,.1)", background: "#fff" };
    const blur = { borderColor: "rgba(100,116,139,.18)", boxShadow: "none", background: "#FAFAFA" };

    return (
        <div style={{ background: "#F8F9FF", minHeight: "100vh" }}>

            {/* ── Hero ── */}
            <div style={{ background: "linear-gradient(145deg,#0D0D1F 0%,#1a1440 50%,#1E1E2E 100%)", padding: "100px 24px 70px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -50, left: "25%", width: 300, height: 300, borderRadius: "50%", background: "rgba(79,70,229,.2)", filter: "blur(80px)" }} />
                <div style={{ position: "absolute", bottom: -30, right: "20%", width: 250, height: 250, borderRadius: "50%", background: "rgba(249,115,22,.12)", filter: "blur(70px)" }} />
                <div style={{ position: "relative" }} className="container-max">
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 9999, background: "rgba(79,70,229,.15)", border: "1px solid rgba(99,102,241,.3)", marginBottom: 20, fontSize: ".75rem", fontWeight: 700, color: "#A5B4FC" }}>
                        <MessageCircle size={13} /> WE&apos;D LOVE TO HEAR FROM YOU
                    </div>
                    <h1 style={{ fontFamily: "'DM Serif Display',serif", color: "#fff", marginBottom: 14, lineHeight: 1.15 }}>Get in Touch</h1>
                    <p style={{ color: "rgba(255,255,255,.55)", fontSize: "1.0625rem", maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>
                        Have a question about our courses, pricing, or schedules? We&apos;re here and we respond fast.
                    </p>
                </div>
            </div>

            {/* ── Info Cards ── */}
            <div className="container-max" style={{ padding: "0 24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginTop: -28, marginBottom: 48 }}>
                    {INFO_CARDS.map(({ icon: Icon, title, body, sub, color, bg }) => (
                        <div key={title} style={{ background: "#fff", borderRadius: 16, padding: "22px 20px", border: "1.5px solid rgba(100,116,139,.1)", boxShadow: "0 4px 20px rgba(0,0,0,.06)", transition: "transform .2s, box-shadow .2s" }}
                            onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "translateY(-3px)"; d.style.boxShadow = "0 8px 28px rgba(0,0,0,.1)"; }}
                            onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "translateY(0)"; d.style.boxShadow = "0 4px 20px rgba(0,0,0,.06)"; }}
                        >
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                                <Icon size={20} color={color} />
                            </div>
                            <p style={{ fontWeight: 700, color: "#1E1E2E", fontSize: ".9rem", marginBottom: 4 }}>{title}</p>
                            <p style={{ color: "#374151", fontSize: ".85rem", marginBottom: 4 }}>{body}</p>
                            <p style={{ color: "#94A3B8", fontSize: ".76rem" }}>{sub}</p>
                        </div>
                    ))}
                </div>

                {/* ── Main Grid ── */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 28, marginBottom: 60 }} className="contact-grid">

                    {/* Form */}
                    <div style={{ background: "#fff", borderRadius: 20, padding: "36px 32px", border: "1.5px solid rgba(100,116,139,.1)", boxShadow: "0 4px 24px rgba(0,0,0,.05)" }}>
                        <h2 style={{ fontFamily: "'DM Serif Display',serif", color: "#1E1E2E", fontSize: "1.75rem", marginBottom: 6 }}>Send Us a Message</h2>
                        <p style={{ color: "#64748B", fontSize: ".875rem", marginBottom: 28 }}>We reply within 2 hours on weekdays.</p>

                        {sent ? (
                            <div style={{ textAlign: "center", padding: "48px 24px" }}>
                                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(16,185,129,.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                                    <CheckCircle size={32} color="#10B981" />
                                </div>
                                <h3 style={{ fontFamily: "'DM Serif Display',serif", color: "#1E1E2E", fontSize: "1.4rem", marginBottom: 10 }}>Message sent! 🎉</h3>
                                <p style={{ color: "#64748B", fontSize: ".9rem" }}>We&apos;ll get back to you within 2 hours.</p>
                                <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }} style={{ marginTop: 20, padding: "10px 22px", borderRadius: 9, background: "rgba(79,70,229,.08)", border: "none", color: "#4F46E5", fontWeight: 700, cursor: "pointer", fontSize: ".875rem" }}>
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="form-two-col">
                                    <div>
                                        <label style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Full Name *</label>
                                        <input required type="text" placeholder="Your name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                            style={inputStyle} onFocus={e => Object.assign(e.target.style, focus)} onBlur={e => Object.assign(e.target.style, blur)} />
                                    </div>
                                    <div>
                                        <label style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email Address *</label>
                                        <input required type="email" placeholder="hello@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                            style={inputStyle} onFocus={e => Object.assign(e.target.style, focus)} onBlur={e => Object.assign(e.target.style, blur)} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Subject *</label>
                                    <select required value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                                        style={{ ...inputStyle, cursor: "pointer", appearance: "none" }}
                                        onFocus={e => Object.assign(e.target.style, focus)} onBlur={e => Object.assign(e.target.style, blur)}>
                                        <option value="">Select a topic…</option>
                                        <option>Course Information</option>
                                        <option>Pricing &amp; Packages</option>
                                        <option>Schedule a Trial</option>
                                        <option>Technical Support</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Message *</label>
                                    <textarea required rows={5} placeholder="How can we help you?" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                                        style={{ ...inputStyle, resize: "vertical", minHeight: 130 }}
                                        onFocus={e => { e.target.style.borderColor = "#4F46E5"; e.target.style.boxShadow = "0 0 0 4px rgba(79,70,229,.1)"; e.target.style.background = "#fff"; }}
                                        onBlur={e => { e.target.style.borderColor = "rgba(100,116,139,.18)"; e.target.style.boxShadow = "none"; e.target.style.background = "#FAFAFA"; }}
                                    />
                                </div>
                                <button type="submit" disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, padding: "14px", borderRadius: 11, border: "none", background: loading ? "rgba(79,70,229,.6)" : "linear-gradient(135deg,#4F46E5,#6366F1)", color: "#fff", fontWeight: 700, fontSize: "1rem", cursor: loading ? "default" : "pointer", boxShadow: "0 4px 18px rgba(79,70,229,.3)" }}>
                                    {loading ? (
                                        <><div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} /> Sending…</>
                                    ) : (
                                        <> Send Message <ArrowRight size={16} /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        {/* Trial card */}
                        <div style={{ background: "linear-gradient(145deg,#1E1E2E,#2D2B5C)", borderRadius: 18, padding: "28px 26px", position: "relative", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(99,102,241,.2)", filter: "blur(30px)" }} />
                            <Sparkles size={22} color="#818CF8" style={{ marginBottom: 14, position: "relative" }} />
                            <h3 style={{ fontFamily: "'DM Serif Display',serif", color: "#fff", fontSize: "1.35rem", marginBottom: 10, position: "relative" }}>
                                Just want to try a class?
                            </h3>
                            <p style={{ color: "rgba(255,255,255,.55)", fontSize: ".875rem", lineHeight: 1.7, marginBottom: 22, position: "relative" }}>
                                Skip the form. Book your free 30-minute trial directly — no credit card, no commitment.
                            </p>
                            <a href="/sign-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", background: "rgba(79,70,229,.8)", color: "#fff", fontWeight: 700, borderRadius: 10, textDecoration: "none", fontSize: ".875rem", position: "relative" }}>
                                Book Free Trial <ArrowRight size={14} />
                            </a>
                        </div>

                        {/* FAQ quick links */}
                        <div style={{ background: "#fff", borderRadius: 18, padding: "24px 22px", border: "1.5px solid rgba(100,116,139,.1)" }}>
                            <h3 style={{ fontFamily: "'DM Serif Display',serif", color: "#1E1E2E", fontSize: "1.15rem", marginBottom: 16 }}>Common Questions</h3>
                            {["How much do classes cost?", "Can I change tutors?", "Do you teach kids?", "What time zone are classes in?"].map(q => (
                                <a key={q} href="/#faq" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(100,116,139,.08)", textDecoration: "none", color: "#374151", fontSize: ".875rem" }}>
                                    {q} <ArrowRight size={14} color="#94A3B8" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @media (min-width: 900px) {
          .contact-grid { grid-template-columns: 1fr 360px !important; }
        }
        @media (max-width: 580px) {
          .form-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
