import React from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import { useBoardContext } from "../../context/BoardContext";
import { usePhotoContext } from "../../context/PhotoContext";

const BoardDetailPage: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>(); //Хук useParams как он работает.
  const { boards } = useBoardContext();
  const { photos } = usePhotoContext();

  const board = boards.find((b) => b.id === boardId);
  const boardPhotos = photos.filter(
    (photo) => board?.photoIds.includes(photo.id) && !photo.deleted
  );
  if (!board) {
    return (
      <div className="board-container text-center">
        <div className="board-empty-state">
          <div className="board-empty-icon">❌</div>
          <h3 className="board-empty-title">Доска не найдена</h3>
          <a href="/favorites/boards" className="board-create-btn">
            Вернуться к доскам
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="board-container">
      <header className="board-detail-header">
        <h1 className="board-detail-title">{board.title}</h1>
        <p className="board-detail-meta">
          {boardPhotos.length} {boardPhotos.length === 1 ? "пин" : "пинов"} ·
          Создано {new Date(board.createdAt).toLocaleDateString()}
        </p>
      </header>

      {boardPhotos.length === 0 ? (
        <div className="board-empty-state">
          <div className="board-empty-icon">📌</div>
          <h3 className="board-empty-title">Эта доска пуста</h3>
        </div>
      ) : (
        <div className="board-grid">
          {boardPhotos.map((photo) => (
            <Card key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardDetailPage;
