import { useState } from "react";
import { useBoardContext } from "../../context/BoardContext";

const CreateBoardModal = () => {
  const {
    isBoardModalOpen,
    closeBoardModal,
    createBoard,
    addPhotoToBoard,
    boards,
    selectedPhotoId,
  } = useBoardContext();

  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      createBoard(title);
      setTitle("");
    }
  };

  if (!isBoardModalOpen) return null;
  // тег form позволяет принять от пользователя входящую информацию и передаёт её для дальнейшей обработки на стороне сервера
  return (
    <div className="board-modal-overlay">
      <div className="board-modal-container">
        <header className="board-modal-header">
          <h2 className="board-modal-title">
            {selectedPhotoId ? "Добавить в доску" : "Создать доску"}
          </h2>
          <button className="board-modal-close" onClick={closeBoardModal}>
            ✕
          </button>
        </header>

        {boards.length > 0 && selectedPhotoId && (
          <div className="board-modal-form">
            <h3 className="board-card-title">Существующие доски:</h3>
            <div className="board-grid">
              {boards.map((board) => (
                <button
                  key={board.id}
                  onClick={() => {
                    addPhotoToBoard(board.id, selectedPhotoId);
                    closeBoardModal();
                  }}
                  className="board-card"
                >
                  <div className="board-card-content">
                    <h3 className="board-card-title">{board.title}</h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="board-modal-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название доски"
            className="board-modal-input"
            autoFocus
          />
          <div className="board-modal-actions">
            <button
              type="button"
              className="board-modal-btn"
              onClick={closeBoardModal}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="board-modal-primary-btn"
              disabled={!title.trim()}
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateBoardModal;
