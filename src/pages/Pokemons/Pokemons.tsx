import "./Pokemon.css";
import { usePokemon } from "../../hooks/usePokemon";
import { useFilteredPokemon } from "../../hooks/useFilteredPokemon";
import { PokemonTypes } from "../../utils/PokemonTypes";
import LoadingSpinner from "../../utils/LoadingSpinner/Loading";
import { Link } from "react-router-dom";
import { useEffect } from "react";

 const Pokemons = () => {
    const { 
        pokemonList, 
        loading, 
        error, 
        fetchPokemon, 
        currentPage, 
        totalPages, 
        nextPage, 
        prevPage 
    } = usePokemon();

    const {
        filteredPokemonList,
        query,
        setQuery,
        selectedPokemonType,
        setSelectedPokemonType,
    } = useFilteredPokemon(pokemonList || []);

    useEffect(() => {
        fetchPokemon(selectedPokemonType.toLowerCase());
    }, [selectedPokemonType, fetchPokemon]);

    if (loading) return <LoadingSpinner />;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div className="filters">
                <input
                    type="text"
                    placeholder="search pokemon..."
                    className="search"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />

                <select
                    name="pokemonType"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setSelectedPokemonType(e.target.value)
                    }
                    value={selectedPokemonType}
                >
                    <option value="All">All</option>
                    {PokemonTypes.map((type) => (
                        <option key={type.id} value={type.type.toLowerCase()}>
                            {type.type.charAt(0).toUpperCase() + type.type.slice(1)}
                        </option>
                    ))}
                </select>
                <div className="pagination">
                <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Previous
                </button>
                <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                </span>
                <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    Next
                </button>
            </div>
            </div>

            <div className="pokemonGrid">
                {filteredPokemonList.map((pokemon) => (
                    <div key={pokemon.id} className="pokemonCard">
                        <Link
                            to={`/pokemon/${pokemon.id}`}
                            className="pokemonLink"
                        >
                            <div className="pokemonCard">
                                <img
                                    className="pokemonImage"
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                />
                                <h2>{pokemon.name}</h2>
                                <div className="pokemonTypes">
                                    {pokemon.types.map((type, index) => (
                                        <span key={index} className={`type ${type.type.name}`}>
                                            {type.type.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            
        </>
    );
};
export default Pokemons