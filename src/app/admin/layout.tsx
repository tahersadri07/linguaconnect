import Link from "next/link";
import { LayoutDashboard, BookOpen, Users, Calendar, Settings, BarChart3 } from "lucide-react";

const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Overview" },
    { href: "/admin/courses", icon: BookOpen, label: "Courses" },
    { href: "/admin/bookings", icon: Calendar, label: "Bookings" },
    { href: "/admin/students", icon: Users, label: "Students" },
    { href: "/admin/availability", icon: Settings, label: "Availability" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-cream flex">
            {/* Sidebar */}
            <aside className="w-56 bg-charcoal flex flex-col pt-20 pb-8 px-4 fixed h-full">
                <div className="mb-6 px-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-secondary/20 text-secondary">
                        Admin Panel
                    </span>
                    <p className="font-serif text-white text-sm mt-2">LinguaConnect</p>
                </div>
                <nav className="flex flex-col gap-0.5 flex-1">
                    {navItems.map(({ href, icon: Icon, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 text-sm hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </Link>
                    ))}
                </nav>
                <div className="border-t border-white/10 pt-4">
                    <Link href="/" className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 px-3 transition-colors">
                        ← Back to Site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-56 p-8 pt-24">
                {children}
            </main>
        </div>
    );
}
