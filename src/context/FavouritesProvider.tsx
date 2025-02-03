import React from "react";
import { FavouritesContextInterface } from "../interface/Favourites.interface";
import { Pokemon } from "../interface/Pokemons.interface";

export const FavouritesContext = React.createContext<FavouritesContextInterface | null>(null);

export const FavouritePokemonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favouritePokemons, setFavouritePokemons] = React.useState<Partial<Pokemon>[]>([]);


    React.useEffect(() => {
        try {
            const savedFavourites = localStorage.getItem("favouritePokemons");
            if (savedFavourites) {
                setFavouritePokemons(JSON.parse(savedFavourites) as Partial<Pokemon>[]);
            }
        } catch (err) {
            console.error("Error parsing favourites:", err);
            localStorage.removeItem("favouritePokemons");
        }
    }, []);


    React.useEffect(() => {
        localStorage.setItem("favouritePokemons", JSON.stringify(favouritePokemons));
    }, [favouritePokemons]);

    // Add a Pokémon to favourites
    const handleAddToFavorite = (pokemon: Partial<Pokemon>) => {
        if (!pokemon.id) return;

        setFavouritePokemons((prevPokemons) => {
            if (!prevPokemons.some((poke) => poke.id === pokemon.id)) {
                return [...prevPokemons, pokemon];
            }
            return prevPokemons;
        });
    };


    const handleRemoveFromFavorite = (pokemonId: number) => {
        setFavouritePokemons((prevPokemons) => prevPokemons.filter((pokemon) => pokemon.id !== pokemonId));
    };


    

    return (
        <FavouritesContext.Provider
            value={{
                favouritePokemons,
                handleAddToFavorite,
                handleRemoveFromFavorite,

            }}
        >
            {children}
        </FavouritesContext.Provider>
    );
};
