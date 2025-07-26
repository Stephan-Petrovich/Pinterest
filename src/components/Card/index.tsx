import favoriteIconSrc from "../../assets/images/favoriteIcon.svg";
import type { Photo } from "../../domains";
import { useState } from "react";
import { usePhotoContext } from "../../context/PhotoContext";

const Card: React.FC<{
  photo: Photo;
}> = ({ photo }) => {
  const { handleToggleFavorite, handleDeletePhoto } = usePhotoContext();

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
        onClick={() => handleToggleFavorite(photo.id)}
        style={{
          visibility: isHovered ? "visible" : "hidden",
          opacity: isHovered ? "1" : "0",
        }}
      >
        {photo.isFavorite ? "Сохранено" : "Сохранить"}
      </button>
      <button
        className="delete-image"
        onClick={() => handleDeletePhoto(photo.id)}
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
