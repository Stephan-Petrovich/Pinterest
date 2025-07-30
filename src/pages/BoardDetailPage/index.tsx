import React from "react";
import { useParams } from "react-router-dom";
import { BoardService } from "../../services/boardService";
import { PhotoService } from "../../services/photoService";
import Card from "../../components/Card";

const BoardDetailPage: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>(); //Хук useParams как он работает.
  const boards = BoardService.getBoards();
  const board = boards.find((b) => b.id === boardId);

  if (!board) {
    return <div>Доска не найдена</div>;
  }

  const allPhotos = PhotoService.getSavedPhotos() || [];
  const boardPhotos = allPhotos.filter(
    (photo) => board.photoIds.includes(photo.id) && !photo.deleted
  );

  return (
    <div>
      <div>
        <h1>{board.title}</h1>
        <p>
          {boardPhotos.length} {boardPhotos.length === 1 ? "пин" : "пинов"}
        </p>
      </div>

      {boardPhotos.length === 0 ? (
        <div>
          <p>В этой доске пока нет пинов</p>
        </div>
      ) : (
        <div>
          {boardPhotos.map((photo) => (
            <Card key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardDetailPage;
