import { Fragment } from "react/jsx-runtime";
import Card from "../../components/Card";
import type { ReactElement } from "react";
import { usePhotoContext } from "../../context/PhotoContext";
import CreateBoardModal from "../../components/CreateBoardModal";
// import { PhotoService } from "../../services/photoService";
// import { fetchPhotos } from "../../api";

const Homepage = (): ReactElement => {
  const { photos } = usePhotoContext();

  // const resetPhotos = async () => {
  //   const fetchedPhotos = await fetchPhotos();
  //   PhotoService.savePhotos(fetchedPhotos);
  //   window.location.reload(); // Перезагружаем страницу
  // };
  const visiblePhotos = photos.filter((photo) => !photo.deleted);
  return (
    <Fragment>
      {/* <button
        onClick={resetPhotos}
        className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
      >Сбросить</button> */}
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

      <CreateBoardModal />
    </Fragment>
  );
};

export default Homepage;
