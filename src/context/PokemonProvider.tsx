import React, { useEffect } from "react";
import { Pokemon, } from "../interface/Pokemons.interface";
import { PokemonAPI } from "../services/PokemonAPI.service";


export type PokemonData = Partial<Pokemon>;

interface PokemonContextType {
    selectedPokemon: PokemonData | null;
    setSelectedPokemon: (pokemon: PokemonData | null) => void;
    pokemonList: PokemonData[];
    setPokemonList: (pokemons: PokemonData[]) => void;
    loading: boolean;
    error: string | null;
}

export const PokemonContext = React.createContext<PokemonContextType | null>(null);

interface PokemonProviderProps {
    children: React.ReactNode;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {

    const [selectedPokemon, setSelectedPokemon] = React.useState<PokemonData | null | Partial<Pokemon>>(null);
    const [pokemonList, setPokemonList] = React.useState<PokemonData[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const pokemonService = new PokemonAPI();
                const response = await pokemonService.fetchPokemons();
                
             
                const typedPokemonList = response.results.map(pokemon => ({
                    id: pokemon.id!,
                    name: pokemon.name!,
                    image: pokemon.image!,
                    types: pokemon.types!,
                    height: pokemon.height!,
                    abilities:pokemon.abilities!,
                    weight: pokemon.weight!,
                    stats: pokemon.stats || []
                }));

                setPokemonList(typedPokemonList);
            } catch (err) {
                setError("Failed to fetch Pokémon data");
                console.error("Error fetching Pokémon:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    const value = {
        selectedPokemon,
        setSelectedPokemon,
        pokemonList,
        setPokemonList,
        loading,
        error
    };

    return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
};