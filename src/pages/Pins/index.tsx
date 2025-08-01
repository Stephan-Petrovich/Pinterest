import type { Photo } from "../../domains";
import Card from "../../components/Card";
import { Fragment, type ReactElement } from "react";
import { usePhotoContext } from "../../context/PhotoContext";

const Pins = (): ReactElement => {
  const { photos } = usePhotoContext();

  const favoriteImages = photos.filter((photo: Photo) => photo.isFavorite);
  return (
    <Fragment>
      {favoriteImages.length === 0 ? (
        <h1>Избранных фотографий пока нет</h1>
      ) : (
        <div>
          <h1>Избранные фотографии</h1>
          <div className="gallery">
            {favoriteImages.map((photo) => (
              <Card key={photo.id} photo={photo} />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Pins;
