import React from "react";
import { CartContextInterface } from "../interface/cart.interface";
import { Pokemon } from "../interface/Pokemons.interface";

// Create an interface for cart items with quantity
interface CartItem extends Partial<Pokemon> {
    quantity: number;
}

export const CartContext = React.createContext<CartContextInterface | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartPokemons, setCartPokemons] = React.useState<CartItem[]>([]);

    React.useEffect(() => {
        const savedCart = localStorage.getItem('pokemonCart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart) as CartItem[];
                setCartPokemons(parsedCart);
            } catch (error) {
                console.error('Error parsing cart data:', error);
                localStorage.removeItem('pokemonCart');
            }
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem('pokemonCart', JSON.stringify(cartPokemons));
    }, [cartPokemons]);

    const handleAddToCart = (pokemon: Partial<Pokemon>) => {
        if (!pokemon.id) return;

        setCartPokemons(prevPokemons => {
            const existingPokemonIndex = prevPokemons.findIndex(item => item.id === pokemon.id);
            
            if (existingPokemonIndex > -1) {
                // If Pokemon already exists, increase quantity
                const updatedCart = [...prevPokemons];
                updatedCart[existingPokemonIndex].quantity += 1;
                return updatedCart;
            } else {
                // If Pokemon is new, add with quantity 1
                return [...prevPokemons, { ...pokemon, quantity: 1 }];
            }
        });
    };

    const handleRemoveFromCart = (pokemonId: number) => {
        setCartPokemons(prevItems => 
            prevItems.filter(pokemon => pokemon.id !== pokemonId)
        );
    };

    const handleUpdateQuantity = (pokemonId: number, quantity: number) => {
        setCartPokemons(prevItems => 
            prevItems.map(pokemon => 
                pokemon.id === pokemonId 
                    ? { ...pokemon, quantity: Math.max(0, quantity) } 
                    : pokemon
            ).filter(pokemon => pokemon.quantity > 0)
        );
    };

    const handleClearCart = () => {
        setCartPokemons([]);
    };

    return (
        <CartContext.Provider value={{
            cartPokemons,
            handleAddToCart,
            handleRemoveFromCart,
            handleClearCart,
            handleUpdateQuantity  // Add this new method
        }}>
            {children}
        </CartContext.Provider>
    );
};