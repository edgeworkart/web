import React from 'react';

const navItems = [
  { label: 'Artworks', key: 'artworks' },
  { label: 'Artists', key: 'artists' },
  { label: 'Exhibitions', key: 'exhibitions' },
];

export default function AdminLayout({ children, active, setActive }: {
  children: React.ReactNode;
  active: string;
  setActive: (key: string) => void;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center font-bold text-xl border-b">Admin</div>
        <nav className="flex-1 py-4">
          <ul>
            {navItems.map(item => (
              <li key={item.key}>
                <button
                  className={`w-full text-left px-6 py-3 font-medium hover:bg-blue-50 transition ${active === item.key ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
                  onClick={() => setActive(item.key)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top nav */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
          <div className="font-bold text-lg">Admin Dashboard</div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">admin@example.com</span>
            <button className="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">Logout</button>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
} 