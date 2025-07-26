import type { Photo } from "../domains";

export const getSavedPhotos = (): Photo[] => {
  const saved = localStorage.getItem("photos");
  return saved ? JSON.parse(saved) : null;
};

export const savePhotos = (photos: Photo[]) => {
  localStorage.setItem("photos", JSON.stringify(photos));
};
