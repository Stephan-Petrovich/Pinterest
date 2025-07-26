import type { ReactElement } from "react";
import { Link } from "react-router-dom";

const HeaderFav = (): ReactElement => {
  return (
    <header className="header-fav">
      <Link to="/favorites/pins">Пины</Link>
      <Link to="/favorites/boards">Доски</Link>
    </header>
  );
};

export default HeaderFav;
