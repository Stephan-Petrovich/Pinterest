import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useBoardContext } from "../../context/BoardContext";
import CreateBoardModal from "../../components/CreateBoardModal";
import BoardCoverImage from "../../components/BoardCoverImage";

const BoardsPage: React.FC = () => {
  const { boards, openBoardModal } = useBoardContext();

  return (
    <div className="board-container">
      <header className="board-header">
        <h1 className="board-title">Мои доски</h1>
        <button className="board-create-btn" onClick={() => openBoardModal()}>
          Создать доску
        </button>
      </header>

      {boards.length === 0 ? (
        <div className="board-empty-state">
          <div className="board-empty-icon">📌</div>
          <h3 className="board-empty-title">У вас пока нет досок</h3>
          <button className="board-create-btn" onClick={() => openBoardModal()}>
            Создать доску
          </button>
        </div>
      ) : (
        <div className="board-grid">
          {boards.map((board) => (
            <Link
              to={`/favorites/boards/${board.id}`}
              key={board.id}
              className="board-card"
            >
              <div className="board-cover-container">
                <BoardCoverImage photoIds={board.photoIds} />
              </div>
              <div className="board-card-content">
                <h3 className="board-card-title">{board.title}</h3>
                <p className="board-card-count">
                  {board.photoIds.length}{" "}
                  {board.photoIds.length === 1 ? "пин" : "пинов"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <CreateBoardModal />
      <Outlet />
    </div>
  );
};
export default BoardsPage;
