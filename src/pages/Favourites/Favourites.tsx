import React from "react";
import { FavouritesContext } from "../../context/FavouritesProvider";
import { Pokemon } from "../../interface/Pokemons.interface";
import '../Favourites/Favourites.css'

interface FavouritesQuantity extends Partial<Pokemon> {
  quantity: number;
}

export const Favourites = () => {
  const favouritesContext = React.useContext(FavouritesContext);
  const [favouritePokemons, setFavouritePokemons] = React.useState<FavouritesQuantity[]>([]);

  React.useEffect(() => {
    if (favouritesContext?.favouritePokemons) {
      const pokemonQuantity = favouritesContext.favouritePokemons.map(poke => ({
        ...poke,
        quantity: 1
      }));
      setFavouritePokemons(pokemonQuantity);
    }
  }, [favouritesContext?.favouritePokemons]);


  const handleRemoveFavourite = (pokemonId: number | undefined) => {
    if (!pokemonId || !favouritesContext) return;
    favouritesContext.handleRemoveFromFavorite(pokemonId);
  };

  if (!favouritePokemons.length) {
    return (
      <div className="favourites-empty">
        <h2>No Favourite Pokémon</h2>
        <p>Start adding some Pokémon to your favourites!</p>
      </div>
    );
  }

  return (
    <>
    <div className="cart-container">
      <h1>My Favourite Pokémon</h1>

      <div className="cart-items">
        {favouritePokemons.map((pokemon) => (
          <div key={pokemon.id} className="cart-item">
            <div className="pokemon-image-container">
              <img
                src={pokemon.sprites?.front_default || pokemon.image || '/api/placeholder/200/200'}
                alt={pokemon.name}
                className="item-image"
              />
              <button 
                className="remove-button"
                onClick={() => handleRemoveFavourite(pokemon.id)}
                aria-label="Remove from favorites"
              >
                ×
              </button>
            </div>
            <div className="pokemon-details">
              <h2>{pokemon.name}</h2>
              <div className="pokemon-info">
                <span>#{pokemon.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      </>
  );
};

export default Favourites;