import { Pokemon } from "./Pokemons.interface";
export interface FavouritesContextInterface {
    favouritePokemons: Partial<Pokemon>[];
    handleAddToFavorite: (pokemon: Partial<Pokemon>) => void;
    handleRemoveFromFavorite: (pokemonId: number) => void;
}
//# sourceMappingURL=Favourites.interface.d.ts.map