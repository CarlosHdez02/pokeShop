import { Pokemon } from "./Pokemons.interface";

export interface CartContextInterface {
    cartPokemons: Partial<Pokemon>[];
    handleAddToCart: (pokemon: Partial<Pokemon>) => void;
    handleRemoveFromCart: (pokemonId: number) => void;
    handleClearCart: () => void;
    handleUpdateQuantity?: (pokemonId: number, quantity: number) => void;
}