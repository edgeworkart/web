import React, { useEffect, useState } from 'react';
import apiClient from '@/lib/axios';

interface Artist {
  id: number;
  name: string;
  bio: string;
}

const ArtistsTab = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [newArtist, setNewArtist] = useState({ name: '', bio: '' });
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await apiClient.get('/admin/artists');
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  const createArtist = async () => {
    try {
      const response = await apiClient.post('/admin/artists', newArtist);
      setArtists([...artists, response.data]);
      setNewArtist({ name: '', bio: '' });
    } catch (error) {
      console.error('Error creating artist:', error);
    }
  };

  const updateArtist = async (id: number, updatedArtist: Partial<Artist>) => {
    try {
      const response = await apiClient.patch(`/admin/artists/${id}`, updatedArtist);
      setArtists(artists.map(artist => artist.id === id ? response.data : artist));
    } catch (error) {
      console.error('Error updating artist:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Artists</h2>
      <button
        onClick={() => setEditingArtist({ id: 0, name: '', bio: '' })}
        className="bg-green-500 text-white p-2 rounded mb-4"
      >
        Add Artist
      </button>
      {editingArtist && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-bold mb-4">{editingArtist.id ? 'Edit Artist' : 'New Artist'}</h3>
            <input
              type="text"
              placeholder="Name"
              value={editingArtist.name}
              onChange={(e) => setEditingArtist({ ...editingArtist, name: e.target.value })}
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <textarea
              placeholder="Bio"
              value={editingArtist.bio}
              onChange={(e) => setEditingArtist({ ...editingArtist, bio: e.target.value })}
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <button
              onClick={() => {
                if (editingArtist.id) {
                  updateArtist(editingArtist.id, editingArtist);
                } else {
                  createArtist();
                }
                setEditingArtist(null);
              }}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setEditingArtist(null)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <div key={artist.id} className="bg-white shadow-md rounded-lg overflow-hidden p-4">
            <h3 className="text-lg font-bold mb-2">{artist.name}</h3>
            <p className="text-gray-700 mb-4">{artist.bio}</p>
            <button
              onClick={() => setEditingArtist(artist)}
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

export default ArtistsTab; 