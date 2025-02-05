import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { FavouritesContext } from "../../context/FavouritesProvider";
import '../Favourites/Favourites.css';
export const Favourites = () => {
    const favouritesContext = React.useContext(FavouritesContext);
    const [favouritePokemons, setFavouritePokemons] = React.useState([]);
    React.useEffect(() => {
        if (favouritesContext?.favouritePokemons) {
            const pokemonQuantity = favouritesContext.favouritePokemons.map(poke => ({
                ...poke,
                quantity: 1
            }));
            setFavouritePokemons(pokemonQuantity);
        }
    }, [favouritesContext?.favouritePokemons]);
    const handleRemoveFavourite = (pokemonId) => {
        if (!pokemonId || !favouritesContext)
            return;
        favouritesContext.handleRemoveFromFavorite(pokemonId);
    };
    if (!favouritePokemons.length) {
        return (_jsxs("div", { className: "favourites-empty", children: [_jsx("h2", { children: "No Favourite Pok\u00E9mon" }), _jsx("p", { children: "Start adding some Pok\u00E9mon to your favourites!" })] }));
    }
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "cart-container", children: [_jsx("h1", { children: "My Favourite Pok\u00E9mon" }), _jsx("div", { className: "cart-items", children: favouritePokemons.map((pokemon) => (_jsxs("div", { className: "cart-item", children: [_jsxs("div", { className: "pokemon-image-container", children: [_jsx("img", { src: pokemon.sprites?.front_default || pokemon.image || '/api/placeholder/200/200', alt: pokemon.name, className: "item-image" }), _jsx("button", { className: "remove-button", onClick: () => handleRemoveFavourite(pokemon.id), "aria-label": "Remove from favorites", children: "\u00D7" })] }), _jsxs("div", { className: "pokemon-details", children: [_jsx("h2", { children: pokemon.name }), _jsx("div", { className: "pokemon-info", children: _jsxs("span", { children: ["#", pokemon.id] }) })] })] }, pokemon.id))) })] }) }));
};
export default Favourites;
