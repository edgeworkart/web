import React, { useState } from 'react';

interface Artist {
  id: number;
  name: string;
  bio: string;
  artworks: string[];
}

const initialArtists: Artist[] = [
  { id: 1, name: 'Alice', bio: 'Abstract painter', artworks: ['Sunset', 'Ocean'] },
  { id: 2, name: 'Bob', bio: 'Modern sculptor', artworks: ['Stone', 'Metal'] },
];

export default function ArtistManager() {
  const [artists, setArtists] = useState<Artist[]>(initialArtists);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Artist | null>(null);
  const [form, setForm] = useState({ name: '', bio: '', artworks: '' });

  const openModal = (artist?: Artist) => {
    setEditing(artist || null);
    setForm(artist ? { name: artist.name, bio: artist.bio, artworks: artist.artworks.join(', ') } : { name: '', bio: '', artworks: '' });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const newArtworks = form.artworks.split(',').map(s => s.trim()).filter(Boolean);
    if (editing) {
      setArtists(artists.map(a => a.id === editing.id ? { ...editing, ...form, artworks: newArtworks } : a));
    } else {
      setArtists([...artists, { id: Date.now(), name: form.name, bio: form.bio, artworks: newArtworks }]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setArtists(artists.filter(a => a.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Artists</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => openModal()}>Add Artist</button>
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Bio</th>
              <th className="p-3 text-left">Artworks</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artists.map(a => (
              <tr key={a.id} className="border-b">
                <td className="p-3 font-medium">{a.name}</td>
                <td className="p-3">{a.bio}</td>
                <td className="p-3">{a.artworks.join(', ')}</td>
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
            <h3 className="text-lg font-bold mb-4">{editing ? 'Edit' : 'Add'} Artist</h3>
            <div className="space-y-3">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" />
              <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" className="w-full border p-2 rounded" />
              <input name="artworks" value={form.artworks} onChange={handleChange} placeholder="Artworks (comma separated)" className="w-full border p-2 rounded" />
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