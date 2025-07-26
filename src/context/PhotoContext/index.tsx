import React, { createContext, useContext, useEffect, useState } from "react";
import type { Photo } from "../../domains";
import { fetchPhotos } from "../../api";
import { getSavedPhotos, savePhotos } from "../../services/photoService";

interface IPhotoContext {
  photos: Photo[];
  handleToggleFavorite: (id: number) => void;
  handleDeletePhoto: (id: number) => void;
}

const PhotoContext = createContext<IPhotoContext | null>(null);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
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

  useEffect(() => {
    console.log("Photos loaded:", photos);
    if (photos.length > 0) {
      savePhotos(photos);
    }
  }, [photos]);

  const handleToggleFavorite = (id: number) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, isFavorite: !photo.isFavorite } : photo
      )
    );
  };

  const handleDeletePhoto = (id: number) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, deleted: true } : photo
      )
    );
  };

  return (
    <PhotoContext.Provider
      value={{ photos, handleToggleFavorite, handleDeletePhoto }}
    />
  );
};

//Как происходит получение данных из компонента (файла PhotoContext) при помощи хука useContext? Он извлекает, получает доступ или запрашивает данные?
export const usePhotoContext = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error("usePhotoContext must be used within a PhotoProvider");
  }
  return context;
};
