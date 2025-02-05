import { Pokemon } from "../interface/Pokemons.interface";
export declare const usePokemon: () => {
    pokemonList: Pokemon[];
    loading: boolean;
    error: string | null;
    fetchPokemon: (type?: string) => Promise<void>;
    currentPage: number;
    totalPages: number;
    totalCount: number;
    nextPage: () => void;
    prevPage: () => void;
};
//# sourceMappingURL=usePokemon.d.ts.map