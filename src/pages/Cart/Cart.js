import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { CartContext } from "../../context/CartProvider";
import '../..//App.css';
import "./Cart.css";
export const calculatePokemonPrice = (pokemon) => {
    const getStatValue = (statName) => {
        const stat = pokemon.stats?.find((s) => s.stat.name === statName);
        return stat ? stat.base_stat : 0;
    };
    const basePrice = getStatValue("hp") * 1.0 +
        getStatValue("attack") * 1.5 +
        getStatValue("defense") * 1.2 +
        getStatValue("special-attack") * 1.8 +
        getStatValue("special-defense") * 1.4 +
        getStatValue("speed") * 1.3;
    //multiplier system for 
    let priceMultiplier = 1.0;
    if (pokemon.types && pokemon.types.length > 0) {
        const typeName = pokemon.types[0].type.name.toLowerCase();
        switch (typeName) {
            case "legendary":
                priceMultiplier = 2.5;
                break;
            case "dragon":
                priceMultiplier = 1.8;
                break;
            case "ghost":
                priceMultiplier = 1.6;
                break;
            case "psychic":
                priceMultiplier = 1.5;
                break;
            case "normal":
                priceMultiplier = 1.0;
                break;
            default:
                priceMultiplier = 1.1;
        }
    }
    let finalPrice = basePrice * priceMultiplier;
    //discount system from readme
    if (pokemon.types && pokemon.types.length > 0) {
        const typeName = pokemon.types[0].type.name.toLowerCase();
        switch (typeName) {
            case "fire":
                finalPrice *= 0.9;
                break;
            case "water":
                finalPrice *= 0.85;
                break;
            case "grass":
                finalPrice *= 0.88;
                break;
        }
    }
    return finalPrice > 0 ? finalPrice : pokemon.base_experience || 100;
};
const Cart = () => {
    const cartContext = React.useContext(CartContext);
    const [cartItems, setCartItems] = React.useState([]);
    React.useEffect(() => {
        if (cartContext?.cartPokemons) {
            const itemsWithQuantity = cartContext.cartPokemons.map((pokemon) => ({
                ...pokemon,
                quantity: 1,
            }));
            setCartItems(itemsWithQuantity);
        }
    }, [cartContext?.cartPokemons]);
    const calculatePrice = (pokemon) => {
        try {
            console.log("Calculating price for Pokemon:", pokemon);
            console.log("Pokemon stats:", pokemon.stats);
            console.log("Pokemon types:", pokemon.types);
            if (pokemon.stats && pokemon.types) {
                const price = calculatePokemonPrice(pokemon);
                console.log("Calculated price:", price);
                return price;
            }
            const fallbackPrice = pokemon.base_experience || 100;
            console.log("Fallback price:", fallbackPrice);
            return fallbackPrice;
        }
        catch (error) {
            console.error("Price calculation error:", error);
            return pokemon.base_experience || 100;
        }
    };
    const getTypeDiscount = (pokemon) => {
        const typeDiscounts = {
            fire: 0.1,
            water: 0.15,
            grass: 0.12,
        };
        if (pokemon.types && pokemon.types[0]) {
            const type = pokemon.types[0].type.name.toLowerCase();
            return typeDiscounts[type] || 0;
        }
        return 0;
    };
    const calculateSubtotal = (item) => {
        const basePrice = calculatePrice(item);
        const discount = getTypeDiscount(item);
        return basePrice * item.quantity * (1 - discount);
    };
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
    };
    const handleUpdateQuantity = (pokemonId, newQuantity) => {
        if (!pokemonId || newQuantity < 1)
            return;
        setCartItems((prevItems) => prevItems.map((item) => item.id === pokemonId ? { ...item, quantity: newQuantity } : item));
    };
    const handleRemoveItem = (pokemonId) => {
        if (!pokemonId || !cartContext)
            return;
        cartContext.handleRemoveFromCart(pokemonId);
    };
    if (!cartContext || cartItems.length === 0) {
        return (_jsxs("div", { className: "cart-container", children: [_jsx("h1", { children: "Shopping cart" }), _jsx("div", { className: "empty-message", children: "There are no pokemons in cart, add some!" })] }));
    }
    return (_jsxs("div", { className: "cart-container", children: [_jsx("h1", { children: "Shopping cart" }), cartItems.map((item) => (_jsxs("div", { className: "cart-item", children: [_jsxs("div", { className: "item-info", children: [item.image && (_jsx("img", { src: item.image, alt: item.name, className: "item-image" })), _jsxs("div", { className: "item-details", children: [_jsx("h3", { children: item.name }), item.types && item.types[0] && (_jsxs("div", { className: "item-type", children: ["Type: ", item.types[0].type.name, getTypeDiscount(item) > 0 && (_jsxs("span", { className: "discount-badge", children: [(getTypeDiscount(item) * 100).toFixed(0), "% descuento"] }))] }))] })] }), _jsxs("div", { className: "item-actions", children: [_jsxs("div", { className: "quantity-controls", children: [_jsx("button", { onClick: () => handleUpdateQuantity(item.id, item.quantity - 1), className: "quantity-btn", children: "-" }), _jsx("span", { className: "quantity", children: item.quantity }), _jsx("button", { onClick: () => handleUpdateQuantity(item.id, item.quantity + 1), className: "quantity-btn", children: "+" })] }), _jsxs("div", { className: "price-info", children: [_jsxs("div", { className: "subtotal", children: ["$", calculateSubtotal(item).toFixed(2)] }), _jsxs("div", { className: "unit-price", children: ["$", calculatePrice(item).toFixed(2), "/cu"] })] }), _jsx("button", { onClick: () => handleRemoveItem(item.id), className: "remove-btn", children: "Delete" })] })] }, item.id))), _jsx("div", { className: "cart-total", children: _jsx("div", { className: "price-details", children: _jsxs("div", { className: "total-amount", children: ["Total: $", calculateTotal().toFixed(2)] }) }) })] }));
};
export default Cart;
