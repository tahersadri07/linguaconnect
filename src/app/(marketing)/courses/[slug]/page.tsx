import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { courses } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { HoverCard } from "@/components/shared/HoverCard";
import {
    Star, Users, Clock, CheckCircle, Globe, ArrowRight,
    Calendar, Shield, Zap, BookOpen, Award, PlayCircle
} from "lucide-react";

export async function generateStaticParams() {
    return courses.map(c => ({ slug: c.slug }));
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const course = courses.find(c => c.slug === slug);
    if (!course) notFound();

    const related = courses.filter(c => c.id !== course.id && c.language === course.language).slice(0, 3);

    return (
        <div style={{ background: "#F8F9FF", minHeight: "100vh" }}>

            {/* ── Hero ── */}
            <div style={{ position: "relative", height: "480px", overflow: "hidden" }}>
                <Image src={course.image_url} alt={course.title} fill sizes="100vw" style={{ objectFit: "cover" }} priority />
                {/* Layered gradient for premium depth */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,13,31,.4) 0%, rgba(13,13,31,.6) 40%, rgba(13,13,31,.92) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(79,70,229,.15) 0%, transparent 60%)" }} />

                {/* Content overlay */}
                <div className="container-max" style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", padding: "0 24px 40px", width: "100%" }}>
                    {/* Breadcrumb */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                        <Link href="/courses" style={{ color: "rgba(255,255,255,.5)", fontSize: ".8rem", textDecoration: "none", transition: "color .2s" }}>Courses</Link>
                        <span style={{ color: "rgba(255,255,255,.25)", fontSize: ".75rem" }}>›</span>
                        <span style={{ color: "rgba(255,255,255,.8)", fontSize: ".8rem" }}>{course.title}</span>
                    </div>

                    {/* Badges */}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                        <span style={{ padding: "4px 12px", borderRadius: 9999, fontSize: ".72rem", fontWeight: 700, background: course.format === "group" ? "rgba(249,115,22,.9)" : "rgba(79,70,229,.9)", color: "#fff" }}>
                            {course.format === "group" ? "Group Class" : "1:1 Private"}
                        </span>
                        <span style={{ padding: "4px 12px", borderRadius: 9999, fontSize: ".72rem", fontWeight: 700, background: "rgba(255,255,255,.12)", backdropFilter: "blur(8px)", color: "#fff", border: "1px solid rgba(255,255,255,.2)" }}>
                            Level {course.level}
                        </span>
                        <span style={{ padding: "4px 12px", borderRadius: 9999, fontSize: ".72rem", fontWeight: 700, background: "rgba(16,185,129,.8)", color: "#fff" }}>
                            Free Trial Available
                        </span>
                    </div>

                    <h1 style={{ fontFamily: "'DM Serif Display',serif", color: "#fff", fontSize: "clamp(1.75rem,4vw,3rem)", lineHeight: 1.15, marginBottom: 10, textShadow: "0 2px 20px rgba(0,0,0,.3)" }}>
                        {course.title}
                    </h1>
                    <p style={{ color: "rgba(255,255,255,.65)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 640 }}>
                        {course.tagline}
                    </p>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="container-max" style={{ padding: "32px 24px 80px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 28 }} className="course-detail-grid">

                    {/* ── Left Column ── */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

                        {/* Quick stats row */}
                        <div style={{ background: "#fff", borderRadius: 18, padding: "22px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(100px,1fr))", gap: 16, border: "1.5px solid rgba(100,116,139,.1)", boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
                            {[
                                { icon: Star, label: "Rating", value: `${course.rating} ★`, color: "#F97316" },
                                { icon: Users, label: "Students", value: course.students_count.toString(), color: "#4F46E5" },
                                { icon: Clock, label: "Duration", value: `${course.duration_minutes}min`, color: "#10B981" },
                                { icon: Award, label: "Reviews", value: `${course.reviews_count}`, color: "#8B5CF6" },
                            ].map(({ icon: Icon, label, value, color }) => (
                                <div key={label} style={{ textAlign: "center", padding: "4px 0" }}>
                                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Icon size={17} color={color} />
                                        </div>
                                    </div>
                                    <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.25rem", color: "#1E1E2E", lineHeight: 1 }}>{value}</p>
                                    <p style={{ fontSize: ".72rem", color: "#94A3B8", marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" }}>{label}</p>
                                </div>
                            ))}
                        </div>

                        {/* About */}
                        <div style={{ background: "#fff", borderRadius: 18, padding: "28px 26px", border: "1.5px solid rgba(100,116,139,.1)", boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
                            <h2 style={{ fontFamily: "'DM Serif Display',serif", color: "#1E1E2E", fontSize: "1.5rem", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                                <BookOpen size={20} color="#4F46E5" /> About This Course
                            </h2>
                            <p style={{ color: "#475569", lineHeight: 1.85, fontSize: ".9375rem" }}>{course.description}</p>
                        </div>

                        {/* Syllabus */}
                        <div style={{ background: "#fff", borderRadius: 18, padding: "28px 26px", border: "1.5px solid rgba(100,116,139,.1)", boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
                            <h2 style={{ fontFamily: "'DM Serif Display',serif", color: "#1E1E2E", fontSize: "1.5rem", marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
                                <PlayCircle size={20} color="#4F46E5" /> What You&apos;ll Cover
                            </h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "10px 16px" }}>
                                {course.syllabus.map(item => (
                                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", borderRadius: 10, background: "rgba(79,70,229,.04)", border: "1px solid rgba(79,70,229,.08)" }}>
                                        <CheckCircle size={15} color="#4F46E5" style={{ flexShrink: 0, marginTop: 1 }} />
                                        <span style={{ color: "#374151", fontSize: ".855rem", lineHeight: 1.55 }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Class Details */}
                        <div style={{ background: "#fff", borderRadius: 18, padding: "28px 26px", border: "1.5px solid rgba(100,116,139,.1)", boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
                            <h2 style={{ fontFamily: "'DM Serif Display',serif", color: "#1E1E2E", fontSize: "1.5rem", marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
                                <Calendar size={20} color="#4F46E5" /> Class Details
                            </h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
                                {[
                                    { label: "Language", value: course.language.charAt(0).toUpperCase() + course.language.slice(1), icon: Globe },
                                    { label: "Duration", value: `${course.duration_minutes} minutes/session`, icon: Clock },
                                    { label: "Format", value: course.format === "group" ? "Group (max 6 students)" : "1-on-1 Private", icon: Users },
                                    { label: "Schedule", value: "Mon–Sat, 8AM–9PM any timezone", icon: Calendar },
                                ].map(({ label, value, icon: Icon }) => (
                                    <div key={label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(79,70,229,.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                                            <Icon size={16} color="#4F46E5" />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: ".72rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 3 }}>{label}</p>
                                            <p style={{ fontSize: ".875rem", color: "#1E1E2E", fontWeight: 500 }}>{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Booking Card ── */}
                    <div>
                        <div style={{
                            background: "#fff", borderRadius: 20,
                            border: "1.5px solid rgba(79,70,229,.15)",
                            boxShadow: "0 8px 32px rgba(79,70,229,.1)",
                            overflow: "hidden", position: "sticky", top: 88,
                        }}>
                            {/* Price header */}
                            <div style={{ background: "linear-gradient(135deg,#1E1E2E,#2D2B5C)", padding: "26px 26px 20px" }}>
                                <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Starting from</p>
                                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                                    <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "2.5rem", color: "#fff", lineHeight: 1 }}>
                                        {formatPrice(course.price_cents)}
                                    </p>
                                    <span style={{ color: "rgba(255,255,255,.5)", fontSize: ".875rem" }}>/ session</span>
                                </div>
                                <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 10, padding: "6px 12px", borderRadius: 8, background: "rgba(16,185,129,.15)", border: "1px solid rgba(16,185,129,.25)", width: "fit-content" }}>
                                    <Zap size={12} color="#34D399" />
                                    <span style={{ color: "#34D399", fontSize: ".75rem", fontWeight: 700 }}>Free 30-min trial available</span>
                                </div>
                            </div>

                            {/* Inclusions */}
                            <div style={{ padding: "20px 26px" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
                                    {[
                                        `${course.duration_minutes}-minute live session`,
                                        course.format === "group" ? "Max 6 students per class" : "Private 1-on-1 session",
                                        "Zoom or Google Meet",
                                        "Session recording available",
                                        "Free cancellation (24h notice)",
                                    ].map(item => (
                                        <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <CheckCircle size={15} color="#10B981" />
                                            <span style={{ color: "#475569", fontSize: ".85rem" }}>{item}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTAs */}
                                <Link href={`/book/${course.slug}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", background: "linear-gradient(135deg,#4F46E5,#6366F1)", color: "#fff", fontWeight: 700, borderRadius: 11, textDecoration: "none", fontSize: ".9375rem", boxShadow: "0 4px 16px rgba(79,70,229,.35)", marginBottom: 12 }}>
                                    Book This Session <ArrowRight size={16} />
                                </Link>
                                <Link href="/sign-up" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px", background: "rgba(79,70,229,.06)", color: "#4F46E5", fontWeight: 700, borderRadius: 11, textDecoration: "none", fontSize: ".875rem", border: "1.5px solid rgba(79,70,229,.15)" }}>
                                    Start 30-Min Free Trial
                                </Link>

                                {/* Trust note */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 16 }}>
                                    <Shield size={13} color="#94A3B8" />
                                    <p style={{ color: "#94A3B8", fontSize: ".75rem" }}>Free cancellation · No credit card for trial</p>
                                </div>
                            </div>

                            {/* Rating footer */}
                            <div style={{ borderTop: "1px solid rgba(100,116,139,.1)", padding: "16px 26px", display: "flex", gap: 12, alignItems: "center", background: "rgba(248,249,255,.6)" }}>
                                <div style={{ display: "flex", gap: 3 }}>
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill={i <= Math.round(course.rating) ? "#F97316" : "#E2E8F0"} color={i <= Math.round(course.rating) ? "#F97316" : "#E2E8F0"} />)}
                                </div>
                                <span style={{ color: "#1E1E2E", fontWeight: 700, fontSize: ".85rem" }}>{course.rating}</span>
                                <span style={{ color: "#94A3B8", fontSize: ".8rem" }}>({course.reviews_count} reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Related Courses ── */}
                {related.length > 0 && (
                    <div style={{ marginTop: 52 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                            <h2 style={{ fontFamily: "'DM Serif Display',serif", color: "#1E1E2E", fontSize: "1.75rem" }}>Related Courses</h2>
                            <Link href="/courses" style={{ display: "flex", alignItems: "center", gap: 6, color: "#4F46E5", fontWeight: 700, fontSize: ".875rem", textDecoration: "none" }}>View All <ArrowRight size={14} /></Link>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 18 }}>
                            {related.map(c => (
                                <Link key={c.id} href={`/courses/${c.slug}`} style={{ textDecoration: "none" }}>
                                    <HoverCard c={c} />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @media (min-width: 900px) {
          .course-detail-grid { grid-template-columns: 1fr 360px !important; }
        }
      `}</style>
        </div>
    );
}
