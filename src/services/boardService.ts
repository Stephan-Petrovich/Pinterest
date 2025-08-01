import type { Board } from "../domains";

export class BoardService {
  private static readonly BOARDS_KEY = "pinterest_boards"; // Это ключи для сохранения/загрузки фотографий из локального хранилища.

  // Получить все доски
  public static getBoards(): Board[] {
    const boards = localStorage.getItem(this.BOARDS_KEY);
    return boards ? JSON.parse(boards) : [];
  }

  // Создать новую доску
  public static createBoard(title: string): Board {
    const newBoard: Board = {
      id: Date.now().toString(),
      title,
      photoIds: [],
      createdAt: Date.now(),
    };

    const boards = this.getBoards();
    boards.push(newBoard);
    localStorage.setItem(this.BOARDS_KEY, JSON.stringify(boards)); // При помощи статичного метода класса this мы обращаемся к статистическому свойсту класса. А именно на приватные статичные свойства класса

    return newBoard;
  }

  static addPhotoToBoard(boardId: string, photoId: number): void {
    const boards = this.getBoards();
    const boardIndex = boards.findIndex((b) => b.id === boardId);

    if (boardIndex !== -1 && !boards[boardIndex].photoIds.includes(photoId)) {
      // Создаем новый массив, а не мутируем существующий
      const updatedBoards = boards.map((board, index) =>
        index === boardIndex
          ? { ...board, photoIds: [...board.photoIds, photoId] }
          : board
      );

      localStorage.setItem(this.BOARDS_KEY, JSON.stringify(updatedBoards));
    }
  }

  static deleteBoard(boardId: string): void {
    const boards = this.getBoards();
    const updatedBoards = boards.filter((board) => board.id !== boardId);
    localStorage.setItem(this.BOARDS_KEY, JSON.stringify(updatedBoards));
  }

  static removePhotoFromBoard(boardId: string, photoId: number): void {
    const boards = this.getBoards();
    const updatedBoards = boards.map((board) =>
      board.id === boardId
        ? { ...board, photoIds: board.photoIds.filter((id) => id !== photoId) }
        : board
    );
    localStorage.setItem(this.BOARDS_KEY, JSON.stringify(updatedBoards));
  }
}
