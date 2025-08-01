import { usePhotoContext } from "../../context/PhotoContext";
import { useBoardContext } from "../../context/BoardContext";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { Photo } from "../../domains";
import favoriteIconSrc from "../../assets/images/favoriteIcon.svg";
import "./styles.css";

const Card: React.FC<{
  photo: Photo;
}> = ({ photo }) => {
  const { handleToggleFavorite, handleDeletePhoto } = usePhotoContext();
  const { openBoardModal, removePhotoFromBoard } = useBoardContext();
  const { boardId } = useParams();

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const buttonFavoriteClassname: string = !photo.isFavorite ? "" : "favorite";

  const handleRemoveFromBoard = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (boardId) {
      removePhotoFromBoard(boardId, photo.id);
    }
  };
  return (
    <div
      className="photo-card"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <img
        src={photo.url}
        alt={photo.title}
        className="photo-image"
        loading="lazy"
      ></img>
      <button
        className={`add-favorite ${buttonFavoriteClassname}`}
        onClick={(e) => {
          e.stopPropagation();
          handleToggleFavorite(photo.id);
        }}
        style={{
          visibility: isHovered ? "visible" : "hidden",
          opacity: isHovered ? "1" : "0",
        }}
      >
        {photo.isFavorite ? "Сохранено" : "Сохранить"}
      </button>
      <button
        className="delete-image"
        onClick={(e) => {
          e.stopPropagation();
          handleDeletePhoto(photo.id);
        }}
        style={{
          visibility: isHovered ? "visible" : "hidden",
          opacity: isHovered ? "1" : "0",
        }}
      >
        Удалить
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          openBoardModal(photo.id);
        }}
        className="add-to-board"
        style={{
          visibility: isHovered ? "visible" : "hidden",
          opacity: isHovered ? "1" : "0",
        }}
      >
        Добавить в доску
      </button>
      {boardId && (
        <button
          onClick={handleRemoveFromBoard}
          className="action-btn remove-from-board"
          title="Удалить из доски"
          style={{
            visibility: isHovered ? "visible" : "hidden",
            opacity: isHovered ? "1" : "0",
          }}
        >
          🗑️
        </button>
      )}
      <img
        className="favorite-icon"
        style={{ visibility: !photo.isFavorite ? "hidden" : "visible" }}
        src={favoriteIconSrc}
        alt="favorite icon"
      ></img>
    </div>
  );
};

export default Card;
