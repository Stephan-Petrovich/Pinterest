import React, { useState } from "react";
import CreateBoardModal from "../../components/CreateBoardModal";
import { BoardService } from "../../services/boardService";
import { Link, Outlet } from "react-router-dom";
import type { Board } from "../../domains";

const BoardsPage: React.FC = () => {
  const [boards, setBoards] = useState(BoardService.getBoards());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateBoard = (newBoard: Board) => {
    setBoards((prev) => [...prev, newBoard]);
  };

  return (
    <div>
      <div>
        <h1>Мои доски</h1>
        <button onClick={() => setIsModalOpen(true)}>Создать доску</button>
      </div>

      {boards.length === 0 ? (
        <div>
          <p>У вас пока нет досок</p>
          <button onClick={() => setIsModalOpen(true)}>
            Создать первую доску
          </button>
        </div>
      ) : (
        <div>
          {boards.map((board) => (
            <Link to={`/favorites/boards/${board.id}`} key={board.id}>
              <div>
                {board.photoIds.length > 0 ? (
                  <img />
                ) : (
                  <span>Нет фотографий</span>
                )}
              </div>
              <div>
                <h3>{board.title}</h3>
                <p>
                  {board.photoIds.length}{" "}
                  {board.photoIds.length === 1 ? "пин" : "пинов"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateBoard}
      />
      <Outlet />
    </div>
  );
};
export default BoardsPage;
