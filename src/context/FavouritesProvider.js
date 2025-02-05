import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
export const FavouritesContext = React.createContext(null);
export const FavouritePokemonProvider = ({ children }) => {
    const [favouritePokemons, setFavouritePokemons] = React.useState([]);
    // Add a Pokémon to favourites
    const handleAddToFavorite = (pokemon) => {
        if (!pokemon.id)
            return;
        setFavouritePokemons((prevPokemons) => {
            if (!prevPokemons.some((poke) => poke.id === pokemon.id)) {
                return [...prevPokemons, pokemon];
            }
            return prevPokemons;
        });
    };
    const handleRemoveFromFavorite = (pokemonId) => {
        setFavouritePokemons((prevPokemons) => prevPokemons.filter((pokemon) => pokemon.id !== pokemonId));
    };
    return (_jsx(FavouritesContext.Provider, { value: {
            favouritePokemons,
            handleAddToFavorite,
            handleRemoveFromFavorite,
        }, children: children }));
};
