import type { Photo } from "../../domains";
import Card from "../../components/Card";

const Favorites: React.FC<{
  photos: Photo[];
  onToggleFavorite: (id: number) => void;
  deletePhoto: (id: number) => void;
}> = ({ photos, onToggleFavorite, deletePhoto }) => {
  const favoriteImages = photos.filter((photo: Photo) => photo.isFavorite);

  if (!favoriteImages.length) {
    return <p>Избранных фотографий нет</p>;
  }

  return (
    <div>
      <h1>Избранные фотографии:</h1>
      <div className="gallery">
        {favoriteImages.map((photo) => (
          <Card
            key={photo.id}
            photo={photo}
            onToggleFavorite={onToggleFavorite}
            deletePhoto={deletePhoto}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
