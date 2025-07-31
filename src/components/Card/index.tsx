import { usePhotoContext } from "../../context/PhotoContext";
import { useBoardContext } from "../../context/BoardContext";
import { useState } from "react";
import type { Photo } from "../../domains";
import favoriteIconSrc from "../../assets/images/favoriteIcon.svg";
import "./styles.css";

const Card: React.FC<{
  photo: Photo;
}> = ({ photo }) => {
  const { handleToggleFavorite, handleDeletePhoto } = usePhotoContext();
  const { openBoardModal } = useBoardContext();

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const buttonFavoriteClassname: string = !photo.isFavorite ? "" : "favorite";
  return (
    <div
      className="card"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <img src={photo.url} alt={photo.title} loading="lazy"></img>
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
