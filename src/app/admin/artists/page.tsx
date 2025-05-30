import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ArtistManager from '@/components/admin/ArtistManager';
import Spinner from '@/components/Spinner';

export default function ArtistsPage() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('artists');
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);
  return (
    <AdminLayout active={active} setActive={setActive}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Artists</h1>
        <p className="text-gray-500">Manage all artists and their profiles.</p>
      </div>
      {loading ? <Spinner /> : <ArtistManager />}
    </AdminLayout>
  );
} 