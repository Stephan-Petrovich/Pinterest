import type { Photo } from "../domains";

interface IApiResponse {
  success: boolean;
  photos: Photo[];
}

export const fetchPhotos = async () => {
  const response = await fetch(
    "https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=50"
  );
  const data: IApiResponse = await response.json();
  return data.photos.map((photo: any) => ({
    id: photo.id,
    title: photo.title,
    description: photo.description,
    url: photo.url,
    isFavorite: false,
    deleted: false,
  }));
};
