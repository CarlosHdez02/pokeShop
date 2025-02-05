import { useState, useMemo } from 'react';
export const useFilteredPokemon = (pokemonList) => {
    //  customhook to handle the filtering
    const [query, setQuery] = useState('');
    const [selectedPokemonType, setSelectedPokemonType] = useState('All');
    const filteredPokemonList = useMemo(() => {
        return pokemonList.filter((pokemon) => {
            const matchesSearch = pokemon.name.toLowerCase().includes(query.toLowerCase());
            const matchesType = selectedPokemonType === 'All' ||
                pokemon.types.some(type => type.type.name.toLowerCase() === selectedPokemonType.toLowerCase());
            return matchesSearch && matchesType;
        });
    }, [pokemonList, query, selectedPokemonType]);
    return {
        filteredPokemonList,
        query,
        setQuery,
        selectedPokemonType,
        setSelectedPokemonType
    };
};
