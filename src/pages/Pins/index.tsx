import type { Photo } from "../../domains";
import Card from "../../components/Card";

const Pins: React.FC<{
  photos: Photo[];
  onToggleFavorite: (id: number) => void;
  deletePhoto: (id: number) => void;
}> = ({ photos, onToggleFavorite, deletePhoto }) => {
  const favoriteImages = photos.filter((photo: Photo) => photo.isFavorite);
  return (
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
  );
};

export default Pins;
