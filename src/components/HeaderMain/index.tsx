import { Link } from "react-router-dom";
import type { ReactElement } from "react";

const HeaderMain = (): ReactElement => {
  return (
    <header className="headerMain">
      <Link to="/">Главная</Link>
      <Link to="/favorites">Пользователь</Link>
    </header>
  );
};

export default HeaderMain;
