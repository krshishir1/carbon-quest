"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    setUser(null);
    router.push("/login");
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-green-100 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="logo hover:opacity-80 transition-opacity">
            <img src={"/carbon-quest-logo.jpeg"} className="w-36 rounded-lg shadow-sm" />
          </Link>
          <div className="flex items-center gap-8">
            {user && (
              <Link href="/dashboard" className="text-sm font-black text-neutral-600 hover:text-green-600 transition-colors uppercase tracking-widest">
                Dashboard
              </Link>
            )}
            <Link href="/aware" className="text-sm font-black text-neutral-600 hover:text-green-600 transition-colors uppercase tracking-widest">
              Awareness
            </Link>

            {user ? (
              <div className="flex items-center gap-6">
                <Link
                  href="/aware/profile"
                  className="bg-neutral-900 text-white px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-black text-red-500 hover:text-red-700 transition-colors uppercase tracking-widest"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-black text-neutral-600 hover:text-green-600 transition-colors uppercase tracking-widest">
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="bg-green-600 text-white px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg shadow-green-100"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
