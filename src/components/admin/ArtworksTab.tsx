import React, { useEffect, useState } from 'react';
import apiClient from '@/lib/axios';

interface Artwork {
  id: number;
  title: string;
  image: string;
  price: number;
}

const ArtworksTab = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [newArtwork, setNewArtwork] = useState({ title: '', image: '', price: 0 });

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await apiClient.get('/admin/artworks');
        setArtworks(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArtworks();
  }, []);

  const createArtwork = async () => {
    try {
      const response = await apiClient.post('/admin/artworks', newArtwork);
      setArtworks([...artworks, response.data]);
      setNewArtwork({ title: '', image: '', price: 0 });
    } catch (error) {
      console.error('Error creating artwork:', error);
    }
  };

  const updateArtwork = async (id: number, updatedArtwork: Partial<Artwork>) => {
    try {
      const response = await apiClient.patch(`/admin/artworks/${id}`, updatedArtwork);
      setArtworks(artworks.map(artwork => artwork.id === id ? response.data : artwork));
    } catch (error) {
      console.error('Error updating artwork:', error);
    }
  };

  const deleteArtwork = async (id: number) => {
    try {
      await apiClient.delete(`/admin/artworks/${id}`);
      setArtworks(artworks.filter(artwork => artwork.id !== id));
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Artworks</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newArtwork.title}
          onChange={(e) => setNewArtwork({ ...newArtwork, title: e.target.value })}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newArtwork.image}
          onChange={(e) => setNewArtwork({ ...newArtwork, image: e.target.value })}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newArtwork.price}
          onChange={(e) => setNewArtwork({ ...newArtwork, price: parseFloat(e.target.value) })}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={createArtwork}
          className="bg-green-500 text-white p-2 rounded"
        >
          Add Artwork
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={artwork.image} alt={artwork.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{artwork.title}</h3>
              <p className="text-gray-700 mb-4">${artwork.price}</p>
              <button
                onClick={() => updateArtwork(artwork.id, { title: 'Updated Title' })}
                className="bg-blue-500 text-white p-2 rounded mr-2"
              >
                Update
              </button>
              <button
                onClick={() => deleteArtwork(artwork.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtworksTab; 