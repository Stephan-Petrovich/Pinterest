export interface Photo {
  albumId: number | string;
  id: number;
  url: string;
  title: string;
  thumbnailUrl: string;
  isFavorite: boolean;
}
