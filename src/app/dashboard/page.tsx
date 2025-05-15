"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute requireAdmin>
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600">Upload and manage artwork, update pricing, manage inventory.</p>

        {/* Coming soon: artwork uploader, artwork list, edit forms, etc. */}
      </main>
    </ProtectedRoute>
  );
}
