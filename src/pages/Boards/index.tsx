import type { Photo } from "../../domains";

const Boards: React.FC<{
  photos: Photo[];
  onToggleFavorite: (id: number) => void;
  deletePhoto: (id: number) => void;
}> = () => {
  return <p>Досок пока что нет</p>;
};

export default Boards;
