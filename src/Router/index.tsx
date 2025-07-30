import Homepage from "../pages/Homepage";
import FavoritesLayout from "../pages/User";
import DefaultLayout from "../layout/DefaultLayout";
import Pins from "../pages/Pins";
import BoardsPage from "../pages/BoardsPage";
import BoardDetailPage from "../pages/BoardDetailPage";

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
          <Route path="boards" element={<BoardsPage />}>
            <Route
              path="/favorites/boards/:boardId"
              element={<BoardDetailPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
