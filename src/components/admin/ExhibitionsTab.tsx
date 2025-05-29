import React, { useEffect, useState } from 'react';
import apiClient from '@/lib/axios';

interface Exhibition {
  id: number;
  title: string;
  description: string;
}

const ExhibitionsTab = () => {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [newExhibition, setNewExhibition] = useState({ title: '', description: '' });
  const [editingExhibition, setEditingExhibition] = useState<Exhibition | null>(null);

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const response = await apiClient.get('/admin/exhibitions');
        setExhibitions(response.data);
      } catch (error) {
        console.error('Error fetching exhibitions:', error);
      }
    };

    fetchExhibitions();
  }, []);

  const createExhibition = async () => {
    try {
      const response = await apiClient.post('/admin/exhibitions', newExhibition);
      setExhibitions([...exhibitions, response.data]);
      setNewExhibition({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating exhibition:', error);
    }
  };

  const updateExhibition = async (id: number, updatedExhibition: Partial<Exhibition>) => {
    try {
      const response = await apiClient.patch(`/admin/exhibitions/${id}`, updatedExhibition);
      setExhibitions(exhibitions.map(exhibition => exhibition.id === id ? response.data : exhibition));
    } catch (error) {
      console.error('Error updating exhibition:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Exhibitions</h2>
      <button
        onClick={() => setEditingExhibition({ id: 0, title: '', description: '' })}
        className="bg-green-500 text-white p-2 rounded mb-4"
      >
        Add Exhibition
      </button>
      {editingExhibition && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-bold mb-4">{editingExhibition.id ? 'Edit Exhibition' : 'New Exhibition'}</h3>
            <input
              type="text"
              placeholder="Title"
              value={editingExhibition.title}
              onChange={(e) => setEditingExhibition({ ...editingExhibition, title: e.target.value })}
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <textarea
              placeholder="Description"
              value={editingExhibition.description}
              onChange={(e) => setEditingExhibition({ ...editingExhibition, description: e.target.value })}
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <button
              onClick={() => {
                if (editingExhibition.id) {
                  updateExhibition(editingExhibition.id, editingExhibition);
                } else {
                  createExhibition();
                }
                setEditingExhibition(null);
              }}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setEditingExhibition(null)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {exhibitions.map((exhibition) => (
          <div key={exhibition.id} className="bg-white shadow-md rounded-lg overflow-hidden p-4">
            <h3 className="text-lg font-bold mb-2">{exhibition.title}</h3>
            <p className="text-gray-700 mb-4">{exhibition.description}</p>
            <button
              onClick={() => setEditingExhibition(exhibition)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExhibitionsTab; 