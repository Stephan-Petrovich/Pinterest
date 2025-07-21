import Homepage from "../pages/Homepage";
import Favorites from "../pages/Favorites";
import Header from "../components/Header";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import type { Photo } from "../domains";

const Router: React.FC<{
  photos: Photo[];
  onToggleFavorite: (id: number) => void;
  deletePhoto: (id: number) => void;
}> = ({ photos, onToggleFavorite, deletePhoto }) => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              photos={photos}
              onToggleFavorite={onToggleFavorite}
              deletePhoto={deletePhoto}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              photos={photos}
              onToggleFavorite={onToggleFavorite}
              deletePhoto={deletePhoto}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
