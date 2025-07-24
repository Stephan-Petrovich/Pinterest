import { Fragment } from "react/jsx-runtime";
import Card from "../../components/Card";
import type { Photo } from "../../domains";

const Homepage: React.FC<{
  photos: Photo[];
  onToggleFavorite: (id: number) => void;
  deletePhoto: (id: number) => void;
}> = ({ photos, onToggleFavorite, deletePhoto }) => {
  const visiblePhotos = photos.filter((photo) => !photo.deleted);

  return (
    <Fragment>
      <h1>Галерея фотографий</h1>

      {visiblePhotos.length === 0 ? (
        <p>Нет доступных фотографий</p>
      ) : (
        <div className="gallery">
          {visiblePhotos.map((photo) => (
            <Card
              key={photo.id}
              photo={photo}
              onToggleFavorite={onToggleFavorite}
              deletePhoto={deletePhoto}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Homepage;
