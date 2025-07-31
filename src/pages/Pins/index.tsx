import type { Photo } from "../../domains";
import Card from "../../components/Card";
import { Fragment, type ReactElement } from "react";
import { usePhotoContext } from "../../context/PhotoContext";

const Pins = (): ReactElement => {
  const { photos } = usePhotoContext();

  const favoriteImages = photos.filter((photo: Photo) => photo.isFavorite);
  return (
    <Fragment>
      <h1>Избранные фотографии</h1>
      <div className="gallery">
        {favoriteImages.map((photo) => (
          <Card key={photo.id} photo={photo} />
        ))}
      </div>
    </Fragment>
  );
};

export default Pins;
