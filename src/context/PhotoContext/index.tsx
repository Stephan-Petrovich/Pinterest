import React, { createContext, useContext, useEffect, useState } from "react";
import type { Photo } from "../../domains";
import { fetchPhotos } from "../../api";
import { PhotoService } from "../../services/photoService";

interface IPhotoContext {
  photos: Photo[];
  handleToggleFavorite: (id: number) => void;
  handleDeletePhoto: (id: number) => void;
}

const PhotoContext = createContext<IPhotoContext | null>(null);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const loadPhotos = async () => {
      const savedPhotos = PhotoService.getSavedPhotos();

      if (savedPhotos) {
        setPhotos(savedPhotos);
        return;
      }

      try {
        const fetchedPhotos = await fetchPhotos();
        setPhotos(fetchedPhotos);
        PhotoService.savePhotos(fetchedPhotos);
      } catch (error) {
        console.error("Ошибка загрузки фото:", error);
      }
    };

    loadPhotos();
  }, []);

  useEffect(() => {
    if (photos.length > 0) {
      PhotoService.savePhotos(photos);
    }
  }, [photos]);

  const handleToggleFavorite = (id: number) => {
    setPhotos((prevPhotos) => {
      const index = prevPhotos.findIndex((photo) => photo.id === id);
      if (index === -1) return prevPhotos;

      const newPhotos = [...prevPhotos];
      newPhotos[index] = {
        ...newPhotos[index],
        isFavorite: !newPhotos[index].isFavorite,
      };

      return newPhotos;
    });
  };

  const handleDeletePhoto = (id: number) => {
    setPhotos((prevPhotos) => {
      const index = prevPhotos.findIndex((photo) => photo.id === id);
      if (index === -1) return prevPhotos;

      const newPhotos = [...prevPhotos];
      newPhotos[index] = {
        ...newPhotos[index],
        deleted: true,
        isFavorite: false,
      };

      return newPhotos;
    });
  };

  return (
    <PhotoContext.Provider
      value={{ photos, handleToggleFavorite, handleDeletePhoto }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotoContext = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error("usePhotoContext must be used within a PhotoProvider");
  }
  return context;
};
