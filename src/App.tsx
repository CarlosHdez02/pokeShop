import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Pokemons } from "./pages/Pokemons/Pokemons";
import { PokemonProvider } from "./context/PokemonProvider";
import { PokemonInfoPage } from "./pages/PokemonInfo/PokemonInfo";
import { Layout } from "./layout/layout";
import { Cart } from "./pages/Cart/Cart";
import { CartProvider } from "./context/CartProvider";
import Favourites from "./pages/Favourites/Favourites";
import { FavouritePokemonProvider } from "./context/FavouritesProvider";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider>
        <PokemonProvider>
          <CartProvider>
            <FavouritePokemonProvider>
              <Layout>
                <Routes>
                  <Route index element={<Pokemons />} />
                  <Route path="/pokemons" element={<Pokemons />} />
                  <Route path="/pokemon/:id" element={<PokemonInfoPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/favourites" element={<Favourites />} />
                </Routes>
              </Layout>
            </FavouritePokemonProvider>
          </CartProvider>
        </PokemonProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
