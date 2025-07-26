import Homepage from "../pages/Homepage";
import FavoritesLayout from "../pages/User";
import DefaultLayout from "../layout/DefaultLayout";
import Pins from "../pages/Pins";
import Boards from "../pages/Boards";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import type { ReactElement } from "react";

const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <DefaultLayout />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/favorites" element={<FavoritesLayout />}>
          <Route path="pins" element={<Pins />} />
          <Route path="boards" element={<Boards />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
