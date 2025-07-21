import Card from "../../components/Card";
import type { Photo } from "../../domains";

const Homepage: React.FC<{
  photos: Photo[];
  onToggleFavorite: (id: number) => void;
  deletePhoto: (id: number) => void;
}> = ({ photos, onToggleFavorite, deletePhoto }) => {
  return (
    <div className="gallery">
      {photos.map((photo: Photo) => (
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

export default Homepage;
