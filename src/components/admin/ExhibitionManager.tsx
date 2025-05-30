import React, { useState } from 'react';

interface Exhibition {
  id: number;
  title: string;
  dateRange: string;
  description: string;
}

const initialExhibitions: Exhibition[] = [
  { id: 1, title: 'Spring Show', dateRange: '2024-04-01 to 2024-05-01', description: 'A celebration of spring.' },
  { id: 2, title: 'Summer Expo', dateRange: '2024-06-01 to 2024-07-01', description: 'Hot new works for summer.' },
];

export default function ExhibitionManager() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>(initialExhibitions);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Exhibition | null>(null);
  const [form, setForm] = useState({ title: '', dateRange: '', description: '' });

  const openModal = (exhibition?: Exhibition) => {
    setEditing(exhibition || null);
    setForm(exhibition ? { title: exhibition.title, dateRange: exhibition.dateRange, description: exhibition.description } : { title: '', dateRange: '', description: '' });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (editing) {
      setExhibitions(exhibitions.map(e => e.id === editing.id ? { ...editing, ...form } : e));
    } else {
      setExhibitions([...exhibitions, { id: Date.now(), ...form }]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setExhibitions(exhibitions.filter(e => e.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Exhibitions</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => openModal()}>Add Exhibition</button>
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Date Range</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exhibitions.map(e => (
              <tr key={e.id} className="border-b">
                <td className="p-3 font-medium">{e.title}</td>
                <td className="p-3">{e.dateRange}</td>
                <td className="p-3">{e.description}</td>
                <td className="p-3 flex gap-2">
                  <button className="text-blue-600 hover:underline" onClick={() => openModal(e)}>Edit</button>
                  <button className="text-red-600 hover:underline" onClick={() => handleDelete(e.id)}>Delete</button>
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
            <h3 className="text-lg font-bold mb-4">{editing ? 'Edit' : 'Add'} Exhibition</h3>
            <div className="space-y-3">
              <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" />
              <input name="dateRange" value={form.dateRange} onChange={handleChange} placeholder="Date Range (e.g. 2024-04-01 to 2024-05-01)" className="w-full border p-2 rounded" />
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />
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