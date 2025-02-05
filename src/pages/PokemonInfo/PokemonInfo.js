import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
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
const PokemonPriceDetails = ({ pokemon }) => {
    const getTypeDiscount = (pokemon) => {
        const typeDiscounts = {
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
    return (_jsxs("div", { className: "price-details", children: [_jsxs("div", { className: "base-price", children: ["Base Price: $", basePrice.toFixed(2)] }), discount > 0 && (_jsxs("div", { className: "discount", children: ["Type Discount: ", (discount * 100).toFixed(), "%"] })), _jsxs("div", { className: "final-price", children: ["Final Price: $", finalPrice.toFixed(2)] })] }));
};
const PokemonInfoPage = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [fetchingAdditional, setFetchingAdditional] = React.useState(false);
    const context = React.useContext(PokemonContext);
    const cartContext = React.useContext(CartContext);
    const favouritesContext = React.useContext(FavouritesContext);
    const { id } = useParams();
    React.useEffect(() => {
        const fetchPokemonDetails = async () => {
            if (!context || !id)
                return;
            const pokemon = context.pokemonList.find((pokemon) => pokemon.id === parseInt(id));
            if (pokemon) {
                context.setSelectedPokemon(pokemon);
                return;
            }
            try {
                setFetchingAdditional(true);
                const pokemonAPI = new PokemonAPI();
                const pokemonDetails = await pokemonAPI.fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${id}`);
                context.setSelectedPokemon(pokemonDetails);
            }
            catch (error) {
                console.error("Error fetching additional Pokemon details:", error);
            }
            finally {
                setFetchingAdditional(false);
            }
        };
        fetchPokemonDetails();
    }, []);
    if (!context)
        return _jsx("div", { children: "Error!" });
    if (context.loading || fetchingAdditional)
        return _jsx(LoadingSpinner, {});
    if (context.error || !context.selectedPokemon)
        return _jsx("h1", { children: "Pokemon not found" });
    const handleAddToCart = () => {
        if (!context?.selectedPokemon || !cartContext)
            return;
        if (!context.selectedPokemon.id || !context.selectedPokemon.name) {
            console.error("Invalid Pokemon data");
            return;
        }
        cartContext.handleAddToCart(context.selectedPokemon);
    };
    const handleAddToFavourites = () => {
        if (!context?.selectedPokemon || !favouritesContext)
            return;
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
    return (_jsx("div", { className: "pokemon-info-container", children: _jsxs("div", { className: "pokemon-info-card", children: [_jsx("h1", { className: "pokemon-name", children: context.selectedPokemon.name }), _jsxs("div", { className: "pokemon-content", children: [_jsx("img", { className: "pokemon-detail-image", src: context.selectedPokemon.image, alt: context.selectedPokemon.name }), _jsxs("div", { className: "pokemon-details", children: [_jsxs("div", { className: "section", children: [_jsx("h2", { children: "Types" }), _jsx("div", { className: "pokemonTypes", children: context.selectedPokemon?.types?.map((type, index) => (_jsx("span", { className: `type ${type.type.name}`, children: type.type.name }, index))) })] }), context.selectedPokemon.stats && (_jsxs("div", { className: "section", children: [_jsx("h2", { children: "Base Stats" }), _jsx("div", { className: "stats-grid", children: context.selectedPokemon.stats.map((stat, index) => (_jsxs("div", { className: "stat-item", children: [_jsxs("span", { className: "stat-name", children: [stat.stat.name, ":"] }), _jsx("span", { className: "stat-value", children: stat.base_stat })] }, index))) })] })), context.selectedPokemon?.abilities && (_jsxs("div", { className: "section", children: [_jsx("h2", { children: "Abilities" }), _jsx("div", { className: "abilities-list", children: context.selectedPokemon.abilities.map((ability, index) => (_jsxs("span", { className: "ability", children: [ability.ability.name, ability.is_hidden && (_jsx("span", { className: "hidden-ability", children: " (Hidden)" }))] }, index))) })] })), _jsx(PokemonPriceDetails, { pokemon: context.selectedPokemon })] })] }), _jsxs("div", { className: "button-container", children: [_jsx("button", { className: "addCart", onClick: handleAddToCartAndOpenModal, children: "\uD83D\uDED2 Add to cart" }), _jsx("button", { className: "addFav", onClick: handleAddToFavouriteAndOpenModal, children: "\u2764\uFE0F Add to favourites" })] }), _jsx(AdditionModal, { isOpen: isOpen, onClose: () => setIsOpen(false), message: "added a Pokemon!" })] }) }));
};
export default PokemonInfoPage;
