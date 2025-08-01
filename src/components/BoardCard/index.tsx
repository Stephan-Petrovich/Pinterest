import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBoardContext } from "../../context/BoardContext";
import type { Board } from "../../domains";
import BoardCoverImage from "../BoardCoverImage";

const BoardCard = ({ board }: { board: Board }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { deleteBoard } = useBoardContext();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Удалить доску "${board.title}"?`)) {
      deleteBoard(board.id);
    }
  };

  return (
    <div
      className="board-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/favorites/boards/${board.id}`} className="board-card">
        <div className="board-cover">
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

      {isHovered && (
        <button
          onClick={handleDelete}
          className="delete-board-button"
          aria-label={`Удалить доску ${board.title}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BoardCard;
