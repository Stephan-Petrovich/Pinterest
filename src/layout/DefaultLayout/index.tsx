import { Link } from "react-router-dom";
import type { ReactElement } from "react";

const DefaultLayout = (): ReactElement => {
  return (
    <header className="header-main">
      <Link to="/">Главная</Link>
      <Link to="/favorites">Пользователь</Link>
    </header>
  );
};

export default DefaultLayout;
