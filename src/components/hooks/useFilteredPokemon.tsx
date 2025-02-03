import { useState, useMemo } from 'react';
import { Pokemon } from '../../interface/Pokemons.interface';

export const useFilteredPokemon = (pokemonList: Pokemon[]) => {
    const [query, setQuery] = useState('');
    const [selectedPokemonType, setSelectedPokemonType] = useState<string>('All');

    const filteredPokemonList = useMemo(() => {
        return pokemonList.filter((pokemon) => {
            const matchesSearch = pokemon.name.toLowerCase().includes(query.toLowerCase());
            const matchesType = 
                selectedPokemonType === 'All' || 
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