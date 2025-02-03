import { Link, useLocation } from "react-router-dom";
import './Layout.css'
import { PokemonLogo } from "../utils/Logo/Logo";
import { ThemeToggleButton } from "../components/ToggleButton";

export const Layout = ({children}:any) => {
    const location = useLocation();

    return (
        <>
            <header className="nav-header">
                <Link to={'/'} className="nav-link nav-logo">
                   <PokemonLogo/>
                </Link>
                <Link 
                    to={'/pokemons'} 
                    className={`nav-link ${location.pathname === '/pokemons' ? 'active' : ''}`}
                >
                    Pokemons
                </Link>
                <Link 
                    to={'/cart'} 
                    className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`}
                >
                    Shopping Cart
                </Link>
                <Link 
                    to={'/favourites'} 
                    className={`nav-link ${location.pathname === '/favourites' ? 'active' : ''}`}
                >
                    Favourites
                </Link>
                <ThemeToggleButton />
            </header>
            <main>
                {children}
            </main>
        </>
    )
}