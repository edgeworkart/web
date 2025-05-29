import React from 'react';

const AdminPanel = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-center font-bold text-xl border-b">Admin Panel</div>
        <nav className="mt-4">
          <ul>
            <li className="p-4 hover:bg-gray-200"><a href="#">Dashboard</a></li>
            <li className="p-4 hover:bg-gray-200"><a href="#">Exhibitions</a></li>
            <li className="p-4 hover:bg-gray-200"><a href="#">Artworks</a></li>
            <li className="p-4 hover:bg-gray-200"><a href="#">Artists</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Panel</h1>
        <p>Here you can manage exhibitions, artworks, and artist profiles.</p>
        {/* Add more components here to display data and manage content */}
      </main>
    </div>
  );
};

export default AdminPanel; 