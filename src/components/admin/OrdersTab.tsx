import React, { useEffect, useState } from 'react';
import apiClient from '@/lib/axios';

interface Order {
  id: number;
  customerName: string;
  status: string;
}

const OrdersTab = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get('/admin/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white shadow-md rounded-lg overflow-hidden p-4">
            <h3 className="text-lg font-bold mb-2">Order #{order.id}</h3>
            <p className="text-gray-700 mb-2">Customer: {order.customerName}</p>
            <p className="text-gray-700">Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTab; 