export interface Photo {
  id: number;
  url: string;
  description: string;
  title: string;
  isFavorite: boolean;
  deleted: boolean;
}

export interface Board {
  id: string;
  title: string;
  photoIds: number[]; // IDs фотографий, добавленных в доску
  coverPhotoUrl?: string; // URL обложки доски
  createdAt: number;
}
