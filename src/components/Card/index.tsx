import favoriteIconSrc from "../../assets/images/favoriteIcon.svg";
import type { Photo } from "../../domains";
import { useState } from "react";

const Card: React.FC<{
  photo: Photo;
  onToggleFavorite: (id: number) => void;
  deletePhoto: (id: number) => void;
}> = ({ photo, onToggleFavorite, deletePhoto }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
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
        className="add-favorite"
        onClick={() => onToggleFavorite(photo.id)}
        style={{
          visibility: isHovered ? "visible" : "hidden",
          opacity: isHovered ? "1" : "0",
        }}
      >
        {photo.isFavorite ? "Сохранено" : "Сохранить"}
      </button>
      <button
        className="delete-image"
        onClick={() => deletePhoto(photo.id)}
        style={{
          visibility: isHovered ? "visible" : "hidden",
          opacity: isHovered ? "1" : "0",
        }}
      >
        Удалить
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
