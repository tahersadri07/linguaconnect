"use client";
import { useState } from "react";
import Link from "next/link";
import { BarChart3, BookOpen, Users, Calendar, TrendingUp, DollarSign } from "lucide-react";
import { courses } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const kpis = [
    { label: "Revenue This Week", value: "$1,240", change: "+12%", icon: DollarSign, positive: true },
    { label: "New Bookings", value: "18", change: "+5%", icon: Calendar, positive: true },
    { label: "Active Students", value: "74", change: "+3%", icon: Users, positive: true },
    { label: "Avg Rating", value: "4.9★", change: "+0.1", icon: TrendingUp, positive: true },
];

const recentBookings = [
    { student: "Sarah M.", course: "Conversational English", date: "Apr 7", status: "confirmed" },
    { student: "Carlos R.", course: "Business English", date: "Apr 7", status: "confirmed" },
    { student: "Emma L.", course: "Spanish for Beginners", date: "Apr 8", status: "pending" },
    { student: "Ji-woo K.", course: "Conversational English", date: "Apr 9", status: "confirmed" },
];

export default function AdminPage() {
    return (
        <div>
            <h1 className="font-serif text-2xl text-charcoal mb-6">Admin Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {kpis.map(({ label, value, change, icon: Icon, positive }) => (
                    <div key={label} className="card p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${positive ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                                {change}
                            </span>
                        </div>
                        <p className="font-mono font-bold text-2xl text-charcoal">{value}</p>
                        <p className="text-slate text-xs mt-0.5">{label}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-serif text-xl text-charcoal">Recent Bookings</h2>
                        <Link href="/admin/bookings" className="text-primary text-sm hover:underline">View all</Link>
                    </div>
                    <div className="space-y-3">
                        {recentBookings.map((b, i) => (
                            <div key={i} className="flex items-center justify-between py-3 border-b border-slate/10 last:border-0">
                                <div>
                                    <p className="font-medium text-charcoal text-sm">{b.student}</p>
                                    <p className="text-slate text-xs">{b.course} · {b.date}</p>
                                </div>
                                <span className={`badge text-xs ${b.status === "confirmed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                                    {b.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Courses Overview */}
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-serif text-xl text-charcoal">Courses</h2>
                        <Link href="/admin/courses" className="text-primary text-sm hover:underline">Manage</Link>
                    </div>
                    <div className="space-y-3">
                        {courses.map((c) => (
                            <div key={c.id} className="flex items-center justify-between py-3 border-b border-slate/10 last:border-0">
                                <div>
                                    <p className="font-medium text-charcoal text-sm">{c.title}</p>
                                    <p className="text-slate text-xs">{c.students_count} students · {c.level}</p>
                                </div>
                                <p className="font-mono font-semibold text-primary text-sm">{formatPrice(c.price_cents)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
