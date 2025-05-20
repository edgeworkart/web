"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Masonry from "react-masonry-css";
import ArtworkCard from "@/components/ArtworkCard";
import { Artwork, fetchArtworks } from "@/lib/artworks";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

export default function GalleryPage() {

  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    fetchArtworks().then(setArtworks).catch(console.error);
  }, []);

  return (
    <>
      <Header />
      <main className="px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Discover Art You&apos;ll Love</h1>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-4"
          columnClassName="masonry-column"
        >
          {artworks.map((art) => (
            <ArtworkCard
              key={art.id}
              title={art.title}
              imageUrl={art.image_url}
              price={art.price}
            />
          ))}
        </Masonry>
      </main>
    </>
  );
}
