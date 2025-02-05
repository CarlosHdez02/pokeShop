import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "./App.css";
import '../src/pages/Cart/Cart.css';
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
    return (_jsx(_Fragment, { children: _jsx(ThemeProvider, { children: _jsx(PokemonProvider, { children: _jsx(CartProvider, { children: _jsx(FavouritePokemonProvider, { children: _jsx(Layout, { children: _jsx(Suspense, { fallback: _jsx(LoadingSpinner, {}), children: _jsxs(Routes, { children: [_jsx(Route, { index: true, element: _jsx(Pokemons, {}) }), _jsx(Route, { path: "/pokemons", element: _jsx(Pokemons, {}) }), _jsx(Route, { path: "/pokemon/:id", element: _jsx(PokemonInfoPage, {}) }), _jsx(Route, { path: "/cart", element: _jsx(Cart, {}) }), _jsx(Route, { path: "/favourites", element: _jsx(Favourites, {}) })] }) }) }) }) }) }) }) }));
}
export default App;
