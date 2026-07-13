import React from "react";
import Link from "next/link";
import { Users, Calendar, LayoutDashboard, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-light-mint flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-teal text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-white/10">
          <h1 className="font-serif text-2xl font-bold">Muskaan Admin</h1>
        </div>
        <nav className="flex-1 py-6 flex flex-col space-y-2 px-4">
          <Link href="/admin/consultations" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
            <Users size={20} />
            <span className="font-medium">Consultations</span>
          </Link>
          <Link href="/admin/calendar" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
            <Calendar size={20} />
            <span className="font-medium">Calendar</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-light-mint">
        <header className="bg-white border-b border-linen p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-charcoal">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <button className="text-charcoal/60 hover:text-charcoal transition-colors">
              <Settings size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-teal flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
