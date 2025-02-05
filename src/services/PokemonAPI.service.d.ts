import { Pokemon, PokemonListResponse } from '../interface/Pokemons.interface';
export declare class PokemonAPI {
    baseUrl: string;
    fetchPokemons(offset?: number, limit?: number): Promise<PokemonListResponse>;
    fetchPokemonsByType(type: string, offset?: number, limit?: number): Promise<Pokemon[]>;
    fetchPokemonDetails(url: string): Promise<Pokemon>;
}
//# sourceMappingURL=PokemonAPI.service.d.ts.map