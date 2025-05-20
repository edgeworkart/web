// src/components/Header.tsx
"use client";

import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext"
import LoginModal from "@/components/LoginModal";

export default function Header() {
  const { customer, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const _logout = async () => {
    // ... logout logic ...
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-sm border-b bg-white sticky top-0 z-50">
      {/* Logo / Title */}
      <Link href="/" className="text-2xl font-bold tracking-tight">
        Edgework
      </Link>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-6">
        <input
          type="text"
          placeholder="Search artworks, artists..."
          className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-black/10"
        />
      </div>

      {/* Icons */}
      <div className="flex gap-4 items-center">
        <button onClick={() => {
            if (customer) {
              // Open login modal or toast
              console.log("User not signed in. Show login.");
            } else {
              // Open profile dropdown/menu
              setShowLogin(true);
            }
          }}
          className="p-1 rounded hover:bg-gray-100"
          aria-label="Account">
          <User className="w-5 h-5" />
        </button>
        <Link href="/cart" aria-label="Cart">
          <ShoppingCart className="w-5 h-5" />
        </Link>
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </header>
  );
}
