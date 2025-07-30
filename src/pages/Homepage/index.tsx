import { Fragment } from "react/jsx-runtime";
import Card from "../../components/Card";
import type { ReactElement } from "react";
import { usePhotoContext } from "../../context/PhotoContext";

const Homepage = (): ReactElement => {
  const { photos } = usePhotoContext();

  const visiblePhotos = photos.filter((photo) => !photo.deleted);
  return (
    <Fragment>
      <h1>Галерея фотографий</h1>

      {visiblePhotos.length === 0 ? (
        <p>Нет доступных фотографий</p>
      ) : (
        <div className="gallery">
          {visiblePhotos.map((photo) => (
            <Card key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Homepage;
