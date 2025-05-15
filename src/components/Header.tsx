// src/components/Header.tsx
"use client";

import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function Header() {
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
        <Link href="/account" aria-label="Account">
          <User className="w-5 h-5" />
        </Link>
        <Link href="/cart" aria-label="Cart">
          <ShoppingCart className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
}
