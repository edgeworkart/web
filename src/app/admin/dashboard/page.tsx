import React, { useState } from 'react';
import withAuth from '@/hoc/withAuth';
import ArtworksTab from '@/components/admin/ArtworksTab';
import OrdersTab from '@/components/admin/OrdersTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('artworks');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 ${activeTab === 'artworks' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('artworks')}
        >
          Artworks
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>
      {activeTab === 'artworks' && <ArtworksTab />}
      {activeTab === 'orders' && <OrdersTab />}
    </div>
  );
};

export default withAuth(AdminDashboard); 