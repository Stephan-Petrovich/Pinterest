import type { Photo } from "../../domains";
import Card from "../../components/Card";
import type { ReactElement } from "react";
import { usePhotoContext } from "../../context/PhotoContext";

const Pins = (): ReactElement => {
  const { photos } = usePhotoContext();

  const favoriteImages = photos.filter((photo: Photo) => photo.isFavorite);
  return (
    <div className="gallery">
      {favoriteImages.map((photo) => (
        <Card key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default Pins;
