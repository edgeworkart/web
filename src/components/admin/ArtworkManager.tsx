import React, { useState } from 'react';

interface Artwork {
  id: number;
  title: string;
  price: number;
  status: 'active' | 'inactive';
  image: string;
}

const initialArtworks: Artwork[] = [
  { id: 1, title: 'Golden Gate', price: 1200, status: 'active', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: 2, title: 'Blue Horizon', price: 950, status: 'active', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { id: 3, title: 'Urban Jungle', price: 800, status: 'inactive', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80' },
  { id: 4, title: 'Red Forest', price: 1100, status: 'active', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80' },
  { id: 5, title: 'Night Lights', price: 1300, status: 'active', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { id: 6, title: 'Serenity', price: 700, status: 'inactive', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80' },
  { id: 7, title: 'Mountain Mist', price: 1500, status: 'active', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: 8, title: 'City Reflections', price: 900, status: 'inactive', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80' },
  { id: 9, title: 'Autumn Path', price: 1050, status: 'active', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { id: 10, title: 'Sunset Boulevard', price: 1400, status: 'active', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80' },
  { id: 11, title: 'Green Fields', price: 800, status: 'inactive', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: 12, title: 'Desert Rose', price: 1200, status: 'active', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80' },
  { id: 13, title: 'Winter Lake', price: 950, status: 'active', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { id: 14, title: 'Lavender Dreams', price: 1100, status: 'inactive', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80' },
  { id: 15, title: 'Golden Hour', price: 1300, status: 'active', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: 16, title: 'Rainy Day', price: 700, status: 'inactive', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { id: 17, title: 'Foggy Morning', price: 1500, status: 'active', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80' },
  { id: 18, title: 'Twilight', price: 900, status: 'inactive', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80' },
  { id: 19, title: 'Sunrise Valley', price: 1050, status: 'active', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { id: 20, title: 'Crimson Sky', price: 1400, status: 'active', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
];

export default function ArtworkManager() {
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Artwork | null>(null);
  const [form, setForm] = useState({ title: '', price: 0, status: 'active', image: '' });

  const openModal = (artwork?: Artwork) => {
    setEditing(artwork || null);
    setForm(artwork ? { ...artwork } : { title: '', price: 0, status: 'active', image: '' });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (editing) {
      setArtworks(artworks.map(a => a.id === editing.id ? { ...editing, ...form, price: Number(form.price) } : a));
    } else {
      setArtworks([...artworks, { ...form, id: Date.now(), price: Number(form.price) } as Artwork]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setArtworks(artworks.filter(a => a.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Artworks</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => openModal()}>Add Artwork</button>
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map(a => (
              <tr key={a.id} className="border-b">
                <td className="p-3"><img src={a.image} alt={a.title} className="w-12 h-12 rounded object-cover" /></td>
                <td className="p-3 font-medium">{a.title}</td>
                <td className="p-3">${a.price}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${a.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>{a.status}</span>
                </td>
                <td className="p-3 flex gap-2">
                  <button className="text-blue-600 hover:underline" onClick={() => openModal(a)}>Edit</button>
                  <button className="text-red-600 hover:underline" onClick={() => handleDelete(a.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">{editing ? 'Edit' : 'Add'} Artwork</h3>
            <div className="space-y-3">
              <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" />
              <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="w-full border p-2 rounded" />
              <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full border p-2 rounded" />
              <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={closeModal}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSave}>{editing ? 'Save' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 