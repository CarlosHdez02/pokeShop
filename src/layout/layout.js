import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import './Layout.css';
import { PokemonLogo } from "../utils/Logo/Logo";
import { ThemeToggleButton } from "../components/ToggleButton";
const Layout = ({ children }) => {
    const location = useLocation();
    return (_jsxs(_Fragment, { children: [_jsxs("header", { className: "nav-header", children: [_jsx(Link, { to: '/', className: "nav-link nav-logo", children: _jsx(PokemonLogo, {}) }), _jsx(Link, { to: '/pokemons', className: `nav-link ${location.pathname === '/pokemons' ? 'active' : ''}`, children: "Pokemons" }), _jsx(Link, { to: '/cart', className: `nav-link ${location.pathname === '/cart' ? 'active' : ''}`, children: "Shopping Cart" }), _jsx(Link, { to: '/favourites', className: `nav-link ${location.pathname === '/favourites' ? 'active' : ''}`, children: "Favourites" }), _jsx(ThemeToggleButton, {})] }), _jsx("main", { children: children })] }));
};
export default Layout;
