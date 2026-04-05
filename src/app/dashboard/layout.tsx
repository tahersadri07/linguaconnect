import Link from "next/link";
import { LayoutDashboard, Calendar, User, BookOpen, TrendingUp } from "lucide-react";

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { href: "/dashboard/bookings", icon: Calendar, label: "My Bookings" },
    { href: "/dashboard/profile", icon: User, label: "Profile" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-cream flex">
            {/* Sidebar */}
            <aside className="w-56 bg-white border-r border-slate/10 flex flex-col pt-20 pb-8 px-4 fixed h-full">
                <div className="mb-6 px-2">
                    <span className="badge-primary text-xs">Student</span>
                    <p className="font-serif text-charcoal text-sm mt-2 font-semibold">My Learning</p>
                </div>
                <nav className="flex flex-col gap-1 flex-1">
                    {navItems.map(({ href, icon: Icon, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate text-sm hover:text-charcoal hover:bg-primary-50 transition-colors"
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </Link>
                    ))}
                </nav>
                <div className="border-t border-slate/10 pt-4">
                    <Link href="/courses" className="flex items-center gap-2 text-sm text-primary hover:underline px-3">
                        <BookOpen className="w-4 h-4" /> Browse Courses
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
