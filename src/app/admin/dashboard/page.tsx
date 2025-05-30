"use client";

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ArtworkManager from '@/components/admin/ArtworkManager';
import ArtistManager from '@/components/admin/ArtistManager';
import ExhibitionManager from '@/components/admin/ExhibitionManager';

const AdminDashboard = () => {
  const [active, setActive] = useState('artworks');

  return (
    <AdminLayout active={active} setActive={setActive}>
      {active === 'artworks' && <ArtworkManager />}
      {active === 'artists' && <ArtistManager />}
      {active === 'exhibitions' && <ExhibitionManager />}
    </AdminLayout>
  );
};

export default AdminDashboard; 