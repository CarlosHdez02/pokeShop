import React from "react";
import { PokemonContext } from "../../context/PokemonProvider";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner/Loading";
import "./PokemonInfo.css";
import { CartContext } from "../../context/CartProvider";
import { FavouritesContext } from "../../context/FavouritesProvider";
import AdditionModal from "../../components/Modal/AdditionModal";
import { PokemonAPI } from "../../services/PokemonAPI.service";
import { calculatePokemonPrice } from "../Cart/Cart";
import { Pokemon } from "../../interface/Pokemons.interface";

const PokemonPriceDetails = ({ pokemon }: { pokemon: Partial<Pokemon> }) => {
  const getTypeDiscount = (pokemon: Partial<Pokemon>) => {
    const typeDiscounts: Record<string, number> = {
      fire: 0.1,
      water: 0.15,
      grass: 0.12,
    };

    if (pokemon.types?.[0]) {
      const type = pokemon.types[0].type.name.toLowerCase();
      return typeDiscounts[type] || 0;
    }
    return 0;
  };

  const basePrice = calculatePokemonPrice(pokemon);
  const discount = getTypeDiscount(pokemon);
  const finalPrice = basePrice * (1 - discount);

  return (
    <div className="price-details">
      <div className="base-price">Base Price: ${basePrice.toFixed(2)}</div>
      {discount > 0 && (
        <div className="discount">
          Type Discount: {(discount * 100).toFixed()}%
        </div>
      )}
      <div className="final-price">Final Price: ${finalPrice.toFixed(2)}</div>
    </div>
  );
};

 const PokemonInfoPage = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [fetchingAdditional, setFetchingAdditional] = React.useState<boolean>(false);

  const context = React.useContext(PokemonContext);
  const cartContext = React.useContext(CartContext);
  const favouritesContext = React.useContext(FavouritesContext);

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (!context || !id) return;
      const pokemon = context.pokemonList.find(
        (pokemon) => pokemon.id === parseInt(id)
      );

      if (pokemon) {
        context.setSelectedPokemon(pokemon);
        return;
      }
      try {
        setFetchingAdditional(true);
        const pokemonAPI = new PokemonAPI();
        const pokemonDetails = await pokemonAPI.fetchPokemonDetails(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        context.setSelectedPokemon(pokemonDetails);
      } catch (error) {
        console.error("Error fetching additional Pokemon details:", error);
      } finally {
        setFetchingAdditional(false);
      }
    };

    fetchPokemonDetails();
  }, []);

  if (!context) return <div>Error!</div>;
  if (context.loading || fetchingAdditional) return <LoadingSpinner />;
  if (context.error || !context.selectedPokemon) return <h1>Pokemon not found</h1>;

  const handleAddToCart = () => {
    if (!context?.selectedPokemon || !cartContext) return;
    if (!context.selectedPokemon.id || !context.selectedPokemon.name) {
      console.error("Invalid Pokemon data");
      return;
    }
    cartContext.handleAddToCart(context.selectedPokemon);
  };

  const handleAddToFavourites = () => {
    if (!context?.selectedPokemon || !favouritesContext) return;
    if (!context.selectedPokemon.id || !context.selectedPokemon.name) {
      console.error("Invalid Pokemon data");
      return;
    }
    favouritesContext?.handleAddToFavorite(context.selectedPokemon);
  };

  const handleOpenModal = () => setIsOpen(true);

  const handleAddToCartAndOpenModal = () => {
    handleAddToCart();
    handleOpenModal();
  };

  const handleAddToFavouriteAndOpenModal = () => {
    handleAddToFavourites();
    handleOpenModal();
  };

  return (
    <div className="pokemon-info-container">
      <div className="pokemon-info-card">
        <h1 className="pokemon-name">{context.selectedPokemon.name}</h1>
        <div className="pokemon-content">
          <img
            className="pokemon-detail-image"
            src={context.selectedPokemon.image}
            alt={context.selectedPokemon.name}
          />

          <div className="pokemon-details">
            <div className="section">
              <h2>Types</h2>
              <div className="pokemonTypes">
                {context.selectedPokemon?.types?.map((type, index) => (
                  <span key={index} className={`type ${type.type.name}`}>
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            {context.selectedPokemon.stats && (
              <div className="section">
                <h2>Base Stats</h2>
                <div className="stats-grid">
                  {context.selectedPokemon.stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                      <span className="stat-name">{stat.stat.name}:</span>
                      <span className="stat-value">{stat.base_stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {context.selectedPokemon?.abilities && (
              <div className="section">
                <h2>Abilities</h2>
                <div className="abilities-list">
                  {context.selectedPokemon.abilities.map((ability, index) => (
                    <span key={index} className="ability">
                      {ability.ability.name}
                      {ability.is_hidden && (
                        <span className="hidden-ability"> (Hidden)</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <PokemonPriceDetails pokemon={context.selectedPokemon} />
          </div>
        </div>
        
        <div className="button-container">
          <button className="addCart" onClick={handleAddToCartAndOpenModal}>
            🛒 Add to cart
          </button>
          <button className="addFav" onClick={handleAddToFavouriteAndOpenModal}>
            ❤️ Add to favourites
          </button>
        </div>

        <AdditionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          message="added a Pokemon!"
        />
      </div>
    </div>
  );
};
export default PokemonInfoPage