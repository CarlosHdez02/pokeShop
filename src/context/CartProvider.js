import { jsx as _jsx } from "react/jsx-runtime";
import { createContext } from "react";
import { usePersistedState } from "../hooks/usePersistedState";
export const CartContext = createContext(null);
export const CartProvider = ({ children }) => {
    const [cartPokemons, setCartPokemons] = usePersistedState('cartPokemons', []);
    const handleAddToCart = (pokemon) => {
        if (!pokemon.id)
            return;
        setCartPokemons((prevPokemons = []) => {
            const existingPokemonIndex = prevPokemons.findIndex(item => item.id === pokemon.id);
            if (existingPokemonIndex > -1) {
                const updatedCart = [...prevPokemons];
                updatedCart[existingPokemonIndex].quantity += 1;
                return updatedCart;
            }
            else {
                return [...prevPokemons, { ...pokemon, quantity: 1 }];
            }
        });
    };
    const handleRemoveFromCart = (pokemonId) => {
        setCartPokemons((prevItems = []) => prevItems.filter(pokemon => pokemon.id !== pokemonId));
    };
    const handleUpdateQuantity = (pokemonId, quantity) => {
        setCartPokemons((prevItems = []) => prevItems.map(pokemon => pokemon.id === pokemonId
            ? { ...pokemon, quantity: Math.max(0, quantity) }
            : pokemon).filter(pokemon => pokemon.quantity > 0));
    };
    const handleClearCart = () => {
        setCartPokemons([]);
    };
    return (_jsx(CartContext.Provider, { value: {
            cartPokemons,
            handleAddToCart,
            handleRemoveFromCart,
            handleClearCart,
            handleUpdateQuantity
        }, children: children }));
};
