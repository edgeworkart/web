import React from 'react';
import { Squares2X2Icon, PhotoIcon, UserGroupIcon, CalendarDaysIcon, Cog6ToothIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const navItems = [
  { label: 'Artworks', key: 'artworks', icon: PhotoIcon },
  { label: 'Artists', key: 'artists', icon: UserGroupIcon },
  { label: 'Exhibitions', key: 'exhibitions', icon: CalendarDaysIcon },
  { label: 'Settings', key: 'settings', icon: Cog6ToothIcon },
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
        <div className="h-16 flex items-center justify-center font-bold text-xl border-b">
          <Squares2X2Icon className="w-6 h-6 text-blue-600 mr-2 inline-block align-middle" /> Admin
        </div>
        <nav className="flex-1 py-4">
          <ul>
            {navItems.map(item => (
              <li key={item.key}>
                <button
                  className={`w-full flex items-center gap-3 text-left px-6 py-3 font-medium hover:bg-blue-50 transition ${active === item.key ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
                  onClick={() => setActive(item.key)}
                >
                  <item.icon className="w-5 h-5" />
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
          <div className="font-bold text-lg flex items-center gap-4">
            Admin Dashboard
            <a href="/" className="flex items-center gap-1 text-blue-600 hover:underline text-sm ml-4" target="_blank" rel="noopener noreferrer">
              <ArrowTopRightOnSquareIcon className="w-4 h-4" /> View Site
            </a>
          </div>
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