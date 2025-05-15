import api from "./api";

export type Artwork = {
  id: number;
  title: string;
  image_url: string;
  price: string;
};

export async function fetchArtworks(): Promise<Artwork[]> {
  const response = await api.get<Artwork[]>("/artworks");
  return response.data;
}