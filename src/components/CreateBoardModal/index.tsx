import { useState } from "react";
import type { Board } from "../../domains";
import { BoardService } from "../../services/boardService";

interface ICreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void; //Функция закрытия модалки
  onCreate: (board: Board) => void; //Колбэк создания доски
}

const CreateBoardModal = ({
  isOpen, //props isOpen контролирует видимость модалки
  onClose, //Функция, вызывающаяся при закрытии модального окна
  onCreate,
}: ICreateBoardModalProps) => {
  const [title, setTitle] = useState(""); //Состояние для хранения доски

  const handleSubmit = (e: React.FormEvent) => {
    //e - это объект события (event) , React.FormEvent - тип TS для событий форм, содержащий информацию о событии
    e.preventDefault(); //Отменяет стандартное поведение браузера при отправке формы
    if (title.trim()) {
      //Проверяет пустое ли название ,trim удаляет пробелы с обоих концов строке
      const newBoard = BoardService.createBoard(title);
      onCreate(newBoard);
      setTitle("");
      onClose();
    }
  };

  if (!isOpen) return null;
  // тег form позволяет принять от пользователя входящую информацию и передаёт её для дальнейшей обработки на стороне сервера
  return (
    <div>
      <div>
        <h2>Создать новую доску</h2>
        <form onSubmit={handleSubmit}>
          {" "}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} //onChange срабатывает при изменении значения элемента HTML
            placeholder="Название доски"
            autoFocus
          />
          <div>
            <button type="button" onClick={onClose}>
              Отмена
            </button>
            <button type="submit">Создать</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
