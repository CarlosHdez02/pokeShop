import "./App.css";
import '../src/pages/Cart/Cart.css'
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';
import { PokemonProvider } from "./context/PokemonProvider";
import { CartProvider } from "./context/CartProvider";
import { FavouritePokemonProvider } from "./context/FavouritesProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import Layout from "./layout/layout";
import LoadingSpinner from "./utils/LoadingSpinner/Loading";

// Lazy loading
const Pokemons = lazy(() => import("./pages/Pokemons/Pokemons"));
const PokemonInfoPage = lazy(() => import("./pages/PokemonInfo/PokemonInfo"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Favourites = lazy(() => import("./pages/Favourites/Favourites"));

function App() {
  return (
    <>
      <ThemeProvider>
        <PokemonProvider>
          <CartProvider>
            <FavouritePokemonProvider>
              <Layout>
                <Suspense fallback={<LoadingSpinner/>}>
                  <Routes>
                    <Route index element={<Pokemons />} />
                    <Route path="/pokemons" element={<Pokemons />} />
                    <Route path="/pokemon/:id" element={<PokemonInfoPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/favourites" element={<Favourites />} />
                  </Routes>
                </Suspense>
              </Layout>
            </FavouritePokemonProvider>
          </CartProvider>
        </PokemonProvider>
      </ThemeProvider>
    </>
  );
}

export default App;