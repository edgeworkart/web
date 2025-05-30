import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ExhibitionManager from '@/components/admin/ExhibitionManager';
import Spinner from '@/components/Spinner';

export default function ExhibitionsPage() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('exhibitions');
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);
  return (
    <AdminLayout active={active} setActive={setActive}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Exhibitions</h1>
        <p className="text-gray-500">Manage all exhibitions and schedules.</p>
      </div>
      {loading ? <Spinner /> : <ExhibitionManager />}
    </AdminLayout>
  );
} 