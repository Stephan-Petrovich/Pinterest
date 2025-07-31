import { usePhotoContext } from "../../context/PhotoContext";

const BoardCoverImage = ({ photoIds }: { photoIds: number[] }) => {
  const { photos } = usePhotoContext();
  const boardPhotos = photos.filter((p) => photoIds.includes(p.id));

  if (boardPhotos.length === 0) {
    return (
      <div className="board-empty-cover">
        <span>📌</span>
      </div>
    );
  }

  if (boardPhotos.length === 1) {
    return <img src={boardPhotos[0].url} alt="" className="board-cover-full" />;
  }

  if (boardPhotos.length === 2) {
    return (
      <div className="board-cover-grid-two">
        <img src={boardPhotos[0].url} alt="" className="board-cover-half" />
        <img src={boardPhotos[1].url} alt="" className="board-cover-half" />
      </div>
    );
  }

  return (
    <div className="board-cover-grid-three">
      <img src={boardPhotos[0].url} alt="" className="board-cover-main" />
      <div className="board-cover-secondary">
        <img src={boardPhotos[1].url} alt="" className="board-cover-small" />
        <img src={boardPhotos[2].url} alt="" className="board-cover-small" />
      </div>
    </div>
  );
};

export default BoardCoverImage;
