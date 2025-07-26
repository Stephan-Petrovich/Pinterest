import Header from "../../components/HeaderFav";
import { Outlet } from "react-router";
import type { ReactElement } from "react";

const FavoritesLayout = (): ReactElement => {
  return (
    <div className="favorites">
      <Header />
      <Outlet />
    </div>
  );
};

export default FavoritesLayout;
