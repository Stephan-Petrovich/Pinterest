import { useState, useContext, createContext } from "react";
import { BoardService } from "../../services/boardService";
import type { Board } from "../../domains";

interface IBoardContext {
  boards: Board[];
  createBoard: (title: string) => void;
  addPhotoToBoard: (boardId: string, photoId: number) => void;
  isBoardModalOpen: boolean;
  openBoardModal: (photoId?: number) => void;
  closeBoardModal: () => void;
  selectedPhotoId?: number;
}

const BoardContext = createContext<IBoardContext | null>(null);

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [boards, setBoards] = useState(BoardService.getBoards());
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<number>();

  const createBoard = (title: string) => {
    const newBoard = BoardService.createBoard(title);
    setBoards((prev) => [...prev, newBoard]);

    // Если фото было выбрано до создания доски
    if (selectedPhotoId) {
      addPhotoToBoard(newBoard.id, selectedPhotoId);
    }
  };

  const addPhotoToBoard = (boardId: string, photoId: number) => {
    BoardService.addPhotoToBoard(boardId, photoId);
    setBoards(BoardService.getBoards());
  };

  const openBoardModal = (photoId?: number) => {
    setSelectedPhotoId(photoId);
    setIsBoardModalOpen(true);
  };

  const closeBoardModal = () => {
    setIsBoardModalOpen(false);
    setSelectedPhotoId(undefined);
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        createBoard,
        addPhotoToBoard,
        isBoardModalOpen,
        openBoardModal,
        closeBoardModal,
        selectedPhotoId,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
};
