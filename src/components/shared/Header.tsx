"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Globe, Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { lang, toggle, tr } = useLang();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const NAV = [
        { href: "/courses", label: tr("nav.courses") },
        { href: "/blog", label: tr("nav.blog") },
        { href: "/contact", label: tr("nav.contact") },
    ];

    return (
        <>
            <header style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                transition: "all .3s ease",
                background: scrolled ? "rgba(255,255,255,.92)" : "transparent",
                backdropFilter: scrolled ? "blur(16px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(100,116,139,.12)" : "1px solid transparent",
                boxShadow: scrolled ? "0 2px 16px rgba(79,70,229,.06)" : "none",
            }}>
                <div className="container-max" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68, padding: "0 20px" }}>

                    {/* ── Logo ── */}
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#4F46E5,#F97316)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(79,70,229,.3)" }}>
                            <BookOpen size={18} color="#fff" strokeWidth={2.2} />
                        </div>
                        <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.25rem", color: "#1E1E2E", fontWeight: 700 }}>
                            Lingua<span style={{ color: "#4F46E5" }}>Connect</span>
                        </span>
                    </Link>

                    {/* ── Desktop Nav ── */}
                    <nav style={{ display: "none" }} className="desktop-nav">
                        {NAV.map(n => (
                            <Link key={n.href} href={n.href} style={{ fontSize: ".9rem", fontWeight: 500, color: "#64748B", textDecoration: "none", padding: "6px 14px", borderRadius: 8, transition: "color .2s" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#1E1E2E")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#64748B")}
                            >{n.label}</Link>
                        ))}
                    </nav>

                    {/* ── Desktop Actions ── */}
                    <div style={{ display: "none", alignItems: "center", gap: 10 }} className="desktop-actions">
                        <button onClick={toggle} title={lang === "en" ? "Cambiar a Español" : "Switch to English"} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".8rem", fontWeight: 700, color: "#4F46E5", background: "rgba(79,70,229,.08)", border: "1.5px solid rgba(79,70,229,.15)", borderRadius: 20, padding: "5px 14px", cursor: "pointer", transition: "background .2s" }}>
                            <Globe size={14} /> {tr("lang.switch")}
                        </button>
                        <Link href="/sign-in" className="btn-ghost" style={{ fontSize: ".875rem", padding: "8px 16px" }}>{tr("nav.signin")}</Link>
                        <Link href="/sign-up" className="btn-primary" style={{ fontSize: ".875rem", padding: "9px 20px" }}>{tr("nav.getstarted")}</Link>
                    </div>

                    {/* ── Mobile Hamburger ── */}
                    <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", padding: 8, borderRadius: 8, border: "none", background: menuOpen ? "rgba(79,70,229,.08)" : "transparent", cursor: "pointer", color: "#1E1E2E", transition: "background .2s" }}>
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </header>

            {/* ── Mobile Drawer ── */}
            {menuOpen && (
                <div style={{ position: "fixed", top: 68, left: 0, right: 0, bottom: 0, zIndex: 99, background: "rgba(30,30,46,.5)", backdropFilter: "blur(4px)" }} onClick={() => setMenuOpen(false)}>
                    <div onClick={e => e.stopPropagation()} style={{ background: "#fff", padding: "20px 24px 32px", display: "flex", flexDirection: "column", gap: 4, boxShadow: "0 8px 32px rgba(0,0,0,.12)", animation: "fadeSlideUp .25s ease both" }}>
                        {NAV.map(n => (
                            <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "14px 16px", borderRadius: 12, fontSize: "1rem", fontWeight: 500, color: "#1E1E2E", textDecoration: "none", transition: "background .15s" }}
                                onMouseEnter={e => (e.currentTarget.style.background = "rgba(79,70,229,.07)")}
                                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                            >{n.label}</Link>
                        ))}
                        <div style={{ borderTop: "1px solid rgba(100,116,139,.12)", marginTop: 12, paddingTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                            <Link href="/sign-in" onClick={() => setMenuOpen(false)} className="btn-secondary" style={{ justifyContent: "center" }}>{tr("nav.signin")}</Link>
                            <Link href="/sign-up" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ justifyContent: "center" }}>{tr("nav.getstarted")} — Free</Link>
                        </div>
                        <button onClick={() => { toggle(); setMenuOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", borderRadius: 10, border: "none", background: "rgba(79,70,229,.07)", fontSize: ".85rem", fontWeight: 700, color: "#4F46E5", cursor: "pointer", marginTop: 4 }}>
                            <Globe size={14} /> {tr("lang.mobile")}
                        </button>
                    </div>
                </div>
            )}

            <style>{`
        @media (min-width: 768px) {
          .desktop-nav     { display: flex !important; align-items: center; gap: 4px; }
          .desktop-actions { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav, .desktop-actions { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </>
    );
}
