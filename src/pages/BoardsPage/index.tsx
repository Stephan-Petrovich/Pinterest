import React from "react";
import { Outlet } from "react-router-dom";
import { useBoardContext } from "../../context/BoardContext";
import CreateBoardModal from "../../components/CreateBoardModal";
import BoardCard from "../../components/BoardCard";

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
        </div>
      ) : (
        <div className="board-grid">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}
      <CreateBoardModal />
      <Outlet />
    </div>
  );
};
export default BoardsPage;
