import Router from "../../Router";

import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import type { Photo } from "../../domains";
import "./styles.css";

interface IApiResponse {
  success: boolean;
  photos: Photo[];
}

// const getImagesThroughLocalStorage = (): Photo[] => {
//   try {
//     const savedImages = localStorage.getItem("photos");
//     return savedImages ? JSON.parse(savedImages) : data.photos;
//   } catch {
//     return data.photos;
//   }
// };

const App = (): ReactElement => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect((): void => {
    const fetchPhotos = async () => {
      const response = await fetch(
        "https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=50"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: IApiResponse = await response.json();
      setPhotos(data.photos);
    };
    fetchPhotos();
  }, []);

  useEffect((): void => {
    localStorage.setItem("photos", JSON.stringify(photos));
  }, [photos]);

  const handleToggleFavorite = (id: number) => {
    setPhotos(
      photos.map((photo: Photo) =>
        photo.id === id ? { ...photo, isFavorite: !photo.isFavorite } : photo
      )
    );
  };

  const deletePhoto = (id: number) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  return (
    <Router
      photos={photos}
      onToggleFavorite={handleToggleFavorite}
      deletePhoto={deletePhoto}
    />
  );
};

export default App;
