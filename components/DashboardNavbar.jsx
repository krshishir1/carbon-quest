"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-green-100 py-4 sticky top-0 z-50">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center">
                    <Link href="/dashboard" className="logo hover:opacity-80 transition-opacity">
                        <img src={"/carbon-quest-logo.jpeg"} className="w-36 rounded-lg shadow-sm" />
                    </Link>

                    <div className="flex gap-8 items-center">
                        {user && (
                            <Link href="/dashboard" className="text-sm font-black text-neutral-600 hover:text-green-600 transition-colors uppercase tracking-widest">
                                Calendar
                            </Link>
                        )}
                        <Link href="/aware" className="text-sm font-black text-neutral-600 hover:text-green-600 transition-colors uppercase tracking-widest">
                            Awareness
                        </Link>

                        {user ? (
                            <div className="flex gap-6 items-center">
                                <Link
                                    href="/aware/profile"
                                    className="bg-neutral-900 text-white px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:scale-105 active:scale-95"
                                >
                                    My Profile
                                </Link>
                            </div>
                        ) : (
                            <div className="flex gap-4">
                                <Link href="/login" className="text-sm font-black text-neutral-600 hover:text-green-600 transition-colors uppercase tracking-widest">
                                    Login
                                </Link>
                                <Link href="/signup" className="bg-green-600 text-white px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg shadow-green-100">
                                    Join Us
                                </Link>
                            </div>
                        )}

                        {user && (
                            <Link href="/dashboard/track" className="gradient-btn px-6 py-3 font-black text-xs uppercase tracking-[0.2em] rounded-full transition-all hover:shadow-[0_10px_30px_rgba(34,197,94,0.3)] hover:-translate-y-0.5 active:translate-y-0">
                                Track Impact
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}