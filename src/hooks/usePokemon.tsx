import { useState, useCallback } from "react";

import { PokemonAPI } from "../services/PokemonAPI.service";
import { Pokemon } from "../interface/Pokemons.interface";

export const usePokemon = () => {
  //in this hook i do the fetching and filtering as well as pagination
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const pokemonApi = new PokemonAPI();

  const fetchPokemon = useCallback(
    async (type?: string) => {
      setLoading(true);
      setError(null);

      try {
        const offset = (currentPage - 1) * 21;
        let result: Pokemon[];
        let count: number;

        if (type && type !== "all") {
          result = await pokemonApi.fetchPokemonsByType(type, offset);
          count = result.length;
        } else {
          const fullResult = await pokemonApi.fetchPokemons(offset);
          result = fullResult.results as Pokemon[];
          count = fullResult.count;
        }

        setPokemonList(result);
        setTotalCount(count);
        setTotalPages(Math.ceil(count / 21));
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setLoading(false);
      }
    },
    [currentPage]
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return {
    pokemonList,
    loading,
    error,
    fetchPokemon,
    currentPage,
    totalPages,
    totalCount,
    nextPage,
    prevPage,
  };
};
