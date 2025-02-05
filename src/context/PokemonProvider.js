import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect } from "react";
import { PokemonAPI } from "../services/PokemonAPI.service";
export const PokemonContext = React.createContext(null);
export const PokemonProvider = ({ children }) => {
    const [selectedPokemon, setSelectedPokemon] = React.useState(null);
    const [pokemonList, setPokemonList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const pokemonService = new PokemonAPI();
                const response = await pokemonService.fetchPokemons();
                const typedPokemonList = response.results.map(pokemon => ({
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.image,
                    types: pokemon.types,
                    height: pokemon.height,
                    abilities: pokemon.abilities,
                    weight: pokemon.weight,
                    stats: pokemon.stats || []
                }));
                setPokemonList(typedPokemonList);
            }
            catch (err) {
                setError("Failed to fetch Pokémon data");
                console.error("Error fetching Pokémon:", err);
            }
            finally {
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
    return _jsx(PokemonContext.Provider, { value: value, children: children });
};
