import Link from "next/link";
import {
    LayoutDashboard, Calendar, User, Play, Clock, BookOpen, TrendingUp
} from "lucide-react";

const upcomingClasses = [
    { id: "1", course: "Conversational English", date: "Apr 7, 2026", time: "10:00 AM EST", duration: "60 min", meetUrl: "https://zoom.us/j/123456" },
    { id: "2", course: "Business English", date: "Apr 9, 2026", time: "2:00 PM EST", duration: "60 min", meetUrl: "https://zoom.us/j/789012" },
];

const pastClasses = [
    { id: "3", course: "Conversational English", date: "Mar 31, 2026", duration: "60 min", notes: "Practiced job interview vocabulary and confident body language expressions." },
    { id: "4", course: "Conversational English", date: "Mar 24, 2026", duration: "60 min", notes: "Travel English — airports, hotels, asking for directions." },
];

export default function DashboardPage() {
    return (
        <div>
            <h1 className="font-serif text-2xl text-charcoal mb-6">Welcome back! 👋</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Classes Taken", value: "12", icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
                    { label: "Hours Learned", value: "11.5", icon: Clock, color: "text-secondary", bg: "bg-secondary/10" },
                    { label: "Current Level", value: "B2", icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
                    { label: "Week Streak", value: "4", icon: Calendar, color: "text-warning", bg: "bg-warning/10" },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="card p-5">
                        <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <p className={`font-mono font-bold text-2xl ${color}`}>{value}</p>
                        <p className="text-slate text-xs mt-1">{label}</p>
                    </div>
                ))}
            </div>

            {/* Upcoming Classes */}
            <div className="card p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-serif text-xl text-charcoal">Upcoming Classes</h2>
                    <Link href="/dashboard/bookings" className="text-primary text-sm hover:underline">View all</Link>
                </div>
                {upcomingClasses.length > 0 ? (
                    <div className="space-y-3">
                        {upcomingClasses.map((cls) => (
                            <div key={cls.id} className="flex items-center justify-between p-4 rounded-xl bg-primary-50 border border-primary/10">
                                <div>
                                    <p className="font-semibold text-charcoal">{cls.course}</p>
                                    <p className="text-slate text-sm">{cls.date} · {cls.time} · {cls.duration}</p>
                                </div>
                                <a href={cls.meetUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2 px-4 gap-1.5">
                                    <Play className="w-3.5 h-3.5" /> Join
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-slate mb-4">No upcoming classes yet.</p>
                        <Link href="/courses" className="btn-primary text-sm">Book a Class</Link>
                    </div>
                )}
            </div>

            {/* Past Classes */}
            <div className="card p-6">
                <h2 className="font-serif text-xl text-charcoal mb-4">Recent Sessions</h2>
                <div className="space-y-3">
                    {pastClasses.map((cls) => (
                        <div key={cls.id} className="p-4 rounded-xl bg-slate/5 border border-slate/10">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold text-charcoal text-sm">{cls.course}</p>
                                <span className="text-xs text-slate">{cls.date} · {cls.duration}</span>
                            </div>
                            {cls.notes && <p className="text-slate text-xs leading-relaxed">{cls.notes}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
