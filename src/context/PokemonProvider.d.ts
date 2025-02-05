import React from "react";
import { Pokemon } from "../interface/Pokemons.interface";
export type PokemonData = Partial<Pokemon>;
interface PokemonContextType {
    selectedPokemon: PokemonData | null;
    setSelectedPokemon: (pokemon: PokemonData | null) => void;
    pokemonList: PokemonData[];
    setPokemonList: (pokemons: PokemonData[]) => void;
    loading: boolean;
    error: string | null;
}
export declare const PokemonContext: React.Context<PokemonContextType | null>;
interface PokemonProviderProps {
    children: React.ReactNode;
}
export declare const PokemonProvider: React.FC<PokemonProviderProps>;
export {};
//# sourceMappingURL=PokemonProvider.d.ts.map