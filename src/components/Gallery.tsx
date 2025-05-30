import React, { useEffect, useState } from 'react';
import apiClient from '@/lib/axios';

interface Artwork {
  id: number;
  title: string;
  image: string;
  price: number;
}

// Helper to fix artwork image URLs
function getArtworkImageUrl(url: string): string {
  if (!url) return '';
  // If starts with /rails/ or http://localhost/rails/, prepend or replace host
  if (url.startsWith('/rails/')) {
    return `http://localhost:3001${url}`;
  }
  if (url.startsWith('http://localhost/rails/')) {
    return url.replace('http://localhost', 'http://localhost:3001');
  }
  return url;
}

const Gallery = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await apiClient.get('/artworks');
        setArtworks(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArtworks();
  }, []);

  const addToCart = (artworkId: number) => {
    console.log(`Add artwork ${artworkId} to cart`);
    // Implement add to cart functionality
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {artworks.map((artwork) => (
        <div key={artwork.id} className="bg-white shadow-md rounded-lg overflow-hidden" data-cy="artwork-item">
          <img src={getArtworkImageUrl(artwork.image)} alt={artwork.title} className="w-full h-48 object-cover" data-cy="artwork-image" />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2" data-cy="artwork-title">{artwork.title}</h2>
            <p className="text-gray-700 mb-4" data-cy="artwork-price">${artwork.price}</p>
            <button
              onClick={() => addToCart(artwork.id)}
              className="w-full bg-blue-500 text-white p-2 rounded"
              data-cy="add-to-cart"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery; 