"use client";
import Link from "next/link";
import { BookOpen, Share2, Camera, PlayCircle, Mail, ArrowRight } from "lucide-react";

const COURSES = [
    { label: "Conversational English", href: "/courses/conversational-english" },
    { label: "Business English", href: "/courses/business-english" },
    { label: "Spanish for Beginners", href: "/courses/spanish-beginners" },
    { label: "Advanced Spanish", href: "/courses/advanced-spanish" },
];
const COMPANY = [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];
const LEGAL = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
];
const SOCIALS = [
    { icon: Share2, href: "https://twitter.com", label: "Twitter/X" },
    { icon: Camera, href: "https://instagram.com", label: "Instagram" },
    { icon: PlayCircle, href: "https://youtube.com", label: "YouTube" },
    { icon: Mail, href: "mailto:hello@linguaconnect.com", label: "Email" },
];

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
    return (
        <div>
            <p style={{ fontSize: ".75rem", fontWeight: 700, letterSpacing: ".08em", color: "rgba(255,255,255,.5)", textTransform: "uppercase", marginBottom: 16 }}>
                {title}
            </p>
            {links.map(l => (
                <div key={l.label} style={{ marginBottom: 10 }}>
                    <Link href={l.href} style={{ fontSize: ".875rem", color: "rgba(255,255,255,.55)", textDecoration: "none", transition: "color .2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.55)")}
                    >{l.label}</Link>
                </div>
            ))}
        </div>
    );
}

export default function Footer() {
    return (
        <footer style={{ background: "#0F0F1A", color: "#fff" }}>
            {/* ── CTA Strip ── */}
            <div style={{ background: "linear-gradient(135deg,#4F46E5,#6366F1)", padding: "48px 24px", textAlign: "center" }}>
                <div className="container-max">
                    <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", marginBottom: 8 }}>
                        Ready to start speaking?
                    </p>
                    <p style={{ color: "rgba(255,255,255,.8)", marginBottom: 24, fontSize: ".9375rem" }}>
                        Your free 30-minute trial class is one click away.
                    </p>
                    <Link href="/sign-up" style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "13px 32px", background: "#fff", color: "#4F46E5",
                        fontWeight: 700, borderRadius: 10, textDecoration: "none",
                        boxShadow: "0 4px 16px rgba(0,0,0,.2)", fontSize: ".9375rem",
                        transition: "transform .15s, box-shadow .2s",
                    }}>
                        Book Free Trial <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            {/* ── Main Footer ── */}
            <div className="container-max" style={{ padding: "60px 24px 32px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(155px,1fr))", gap: "40px 32px", marginBottom: 48 }}>
                    {/* Brand */}
                    <div style={{ gridColumn: "span 1" }}>
                        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 14 }}>
                            <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#4F46E5,#F97316)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <BookOpen size={16} color="#fff" />
                            </div>
                            <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.15rem", color: "#fff", fontWeight: 700 }}>
                                Lingua<span style={{ color: "#F97316" }}>Connect</span>
                            </span>
                        </Link>
                        <p style={{ fontSize: ".825rem", color: "rgba(255,255,255,.45)", lineHeight: 1.7, maxWidth: 200 }}>
                            Live 1:1 and group language classes with expert tutors. Learn English &amp; Spanish at any level.
                        </p>
                        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                            {SOCIALS.map(({ icon: Icon, href, label }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{
                                    width: 34, height: 34, borderRadius: 8,
                                    background: "rgba(255,255,255,.08)", display: "flex",
                                    alignItems: "center", justifyContent: "center",
                                    color: "rgba(255,255,255,.6)", textDecoration: "none",
                                    transition: "background .2s, color .2s",
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(79,70,229,.5)"; e.currentTarget.style.color = "#fff"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.color = "rgba(255,255,255,.6)"; }}
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <FooterCol title="Courses" links={COURSES} />
                    <FooterCol title="Company" links={COMPANY} />
                    <FooterCol title="Legal" links={LEGAL} />
                </div>

                {/* Bottom */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 20, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between" }}>
                    <p style={{ fontSize: ".8rem", color: "rgba(255,255,255,.3)" }}>
                        © {new Date().getFullYear()} LinguaConnect. All rights reserved.
                    </p>
                    <p style={{ fontSize: ".8rem", color: "rgba(255,255,255,.3)" }}>
                        Built for language learners worldwide 🌍
                    </p>
                </div>
            </div>
        </footer>
    );
}
