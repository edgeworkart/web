import React from "react";

type Props = {
  title: string;
  imageUrl: string;
  price: string;
};

export default function ArtworkCard({ title, imageUrl, price }: Props) {
  return (
    <div className="rounded overflow-hidden shadow-md bg-white">
      <img src={imageUrl} alt={title} className="w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-gray-600">{price}</p>
      </div>
    </div>
  );
}