import Router from "../../Router";
import { PhotoProvider } from "../../context/PhotoContext";
import type { ReactElement } from "react";
import "./styles.css";

const App = (): ReactElement => {
  return (
    <PhotoProvider>
      <Router />
    </PhotoProvider>
  );
};

export default App;
