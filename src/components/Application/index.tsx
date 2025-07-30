import Router from "../../Router";
import { PhotoProvider } from "../../context/PhotoContext";
import { BoardProvider } from "../../context/BoardContext";
import type { ReactElement } from "react";
import "./styles.css";

const App = (): ReactElement => {
  return (
    <PhotoProvider>
      <BoardProvider>
        <Router />
      </BoardProvider>
    </PhotoProvider>
  );
};

export default App;
