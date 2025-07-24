import Router from "../../Router";

import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import type { Photo } from "../../domains";
import "./styles.css";

interface IApiResponse {
  success: boolean;
  photos: Photo[];
}

const getSavedPhotos = (): Photo[] => {
  const saved = localStorage.getItem("photos");
  return saved ? JSON.parse(saved) : null;
};

const fetchPhotos = async () => {
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

const savePhotos = (photos: Photo[]) => {
  localStorage.setItem("photos", JSON.stringify(photos));
};

const App = (): ReactElement => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect((): void => {
    const loadPhotos = async () => {
      const savedPhotos = getSavedPhotos();
      if (savedPhotos) {
        setPhotos(savedPhotos);
        return;
      }

      try {
        const fetchedPhotos = await fetchPhotos();
        setPhotos(fetchedPhotos);
        savePhotos(fetchedPhotos);
      } catch (error) {
        console.error("Ошибка загрузки фото:", error);
      }
    };
    loadPhotos();
  }, []);

  const handleToggleFavorite = (id: number) => {
    const updatedPhotos = photos.map((photo) =>
      photo.id === id ? { ...photo, isFavorite: !photo.isFavorite } : photo
    );
    setPhotos(updatedPhotos);
    savePhotos(updatedPhotos);
  };

  const handleDelete = (id: number) => {
    const updatedPhotos = photos.map((photo) =>
      photo.id === id ? { ...photo, deleted: true } : photo
    );
    setPhotos(updatedPhotos);
    savePhotos(updatedPhotos);
  };

  return (
    <Router
      photos={photos}
      onToggleFavorite={handleToggleFavorite}
      deletePhoto={handleDelete}
    />
  );
};

export default App;
