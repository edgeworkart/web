import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ArtworkManager from '@/components/admin/ArtworkManager';
import Spinner from '@/components/Spinner';

export default function ArtworksPage() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('artworks');
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);
  return (
    <AdminLayout active={active} setActive={setActive}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Artworks</h1>
        <p className="text-gray-500">Manage all artworks in the gallery.</p>
      </div>
      {loading ? <Spinner /> : <ArtworkManager />}
    </AdminLayout>
  );
} 