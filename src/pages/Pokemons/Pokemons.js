import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "./Pokemon.css";
import { usePokemon } from "../../hooks/usePokemon";
import { useFilteredPokemon } from "../../hooks/useFilteredPokemon";
import { PokemonTypes } from "../../utils/PokemonTypes";
import LoadingSpinner from "../../utils/LoadingSpinner/Loading";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const Pokemons = () => {
    const { pokemonList, loading, error, fetchPokemon, currentPage, totalPages, nextPage, prevPage } = usePokemon();
    const { filteredPokemonList, query, setQuery, selectedPokemonType, setSelectedPokemonType, } = useFilteredPokemon(pokemonList || []);
    useEffect(() => {
        fetchPokemon(selectedPokemonType.toLowerCase());
    }, [selectedPokemonType, fetchPokemon]);
    if (loading)
        return _jsx(LoadingSpinner, {});
    if (error)
        return _jsx("div", { children: error });
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "filters", children: [_jsx("input", { type: "text", placeholder: "search pokemon...", className: "search", onChange: (e) => setQuery(e.target.value), value: query }), _jsxs("select", { name: "pokemonType", onChange: (e) => setSelectedPokemonType(e.target.value), value: selectedPokemonType, children: [_jsx("option", { value: "All", children: "All" }), PokemonTypes.map((type) => (_jsx("option", { value: type.type.toLowerCase(), children: type.type.charAt(0).toUpperCase() + type.type.slice(1) }, type.id)))] }), _jsxs("div", { className: "pagination", children: [_jsx("button", { onClick: prevPage, disabled: currentPage === 1, className: "pagination-button", children: "Previous" }), _jsxs("span", { className: "pagination-info", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { onClick: nextPage, disabled: currentPage === totalPages, className: "pagination-button", children: "Next" })] })] }), _jsx("div", { className: "pokemonGrid", children: filteredPokemonList.map((pokemon) => (_jsx("div", { className: "pokemonCard", children: _jsx(Link, { to: `/pokemon/${pokemon.id}`, className: "pokemonLink", children: _jsxs("div", { className: "pokemonCard", children: [_jsx("img", { className: "pokemonImage", src: pokemon.image, alt: pokemon.name }), _jsx("h2", { children: pokemon.name }), _jsx("div", { className: "pokemonTypes", children: pokemon.types.map((type, index) => (_jsx("span", { className: `type ${type.type.name}`, children: type.type.name }, index))) })] }) }) }, pokemon.id))) })] }));
};
export default Pokemons;
