import React from "react";

type Props = {
  title: string;
  imageUrl: string;
  price: string;
};

export default function ArtworkCard({ title, imageUrl, price }: Props) {
  return (
    <div className="rounded overflow-hidden shadow-md bg-white" data-cy="artwork-card">
      <img
        src={imageUrl || "/placeholder.jpg"}
        alt={title}
        className="w-full object-cover"
        data-cy="artwork-image"
      />
      <div className="p-4">
        <h3 className="text-lg font-medium" data-cy="artwork-title">{title}</h3>
        <p className="text-gray-600" data-cy="artwork-price">{price}</p>
      </div>
    </div>
  );
}