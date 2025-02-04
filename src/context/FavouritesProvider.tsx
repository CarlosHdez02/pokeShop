import React from "react";
import { FavouritesContextInterface } from "../interface/Favourites.interface";
import { Pokemon } from "../interface/Pokemons.interface";

export const FavouritesContext =
  React.createContext<FavouritesContextInterface | null>(null);

export const FavouritePokemonProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [favouritePokemons, setFavouritePokemons] = React.useState<
    Partial<Pokemon>[]
  >([]);

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
    setFavouritePokemons((prevPokemons) =>
      prevPokemons.filter((pokemon) => pokemon.id !== pokemonId)
    );
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
