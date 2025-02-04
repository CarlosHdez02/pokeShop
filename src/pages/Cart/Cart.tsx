import React from "react";
import { CartContext } from "../../context/CartProvider";
import { Pokemon } from "../../interface/Pokemons.interface";
import '../..//App.css'
import "./Cart.css";

export const calculatePokemonPrice = (pokemon: Partial<Pokemon>) => {
  const getStatValue = (statName: string): number => {
    const stat = pokemon.stats?.find((s) => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
  };

  const basePrice =
    getStatValue("hp") * 1.0 +
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

interface CartItemWithQuantity extends Partial<Pokemon> {
  quantity: number;
}

 const Cart = () => {
  const cartContext = React.useContext(CartContext);
  const [cartItems, setCartItems] = React.useState<CartItemWithQuantity[]>([]);

  React.useEffect(() => {
    if (cartContext?.cartPokemons) {
      const itemsWithQuantity = cartContext.cartPokemons.map((pokemon) => ({
        ...pokemon,
        quantity: 1,
      }));
      setCartItems(itemsWithQuantity);
    }
  }, [cartContext?.cartPokemons]);

  const calculatePrice = (pokemon: Partial<Pokemon>) => {
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
    } catch (error) {
      console.error("Price calculation error:", error);
      return pokemon.base_experience || 100;
    }
  };

  const getTypeDiscount = (pokemon: Partial<Pokemon>) => {
    const typeDiscounts: Record<string, number> = {
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

  const calculateSubtotal = (item: CartItemWithQuantity) => {
    const basePrice = calculatePrice(item);
    const discount = getTypeDiscount(item);
    return basePrice * item.quantity * (1 - discount);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateSubtotal(item),
      0
    );
  };

  const handleUpdateQuantity = (
    pokemonId: number | undefined,
    newQuantity: number
  ) => {
    if (!pokemonId || newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === pokemonId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (pokemonId: number | undefined) => {
    if (!pokemonId || !cartContext) return;
    cartContext.handleRemoveFromCart(pokemonId);
  };

  
  if (!cartContext || cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1>Shopping cart</h1>
        <div className="empty-message">
          There are no pokemons in cart, add some!
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="item-info">
            {item.image && (
              <img src={item.image} alt={item.name} className="item-image" />
            )}
            <div className="item-details">
              <h3>{item.name}</h3>
              {item.types && item.types[0] && (
                <div className="item-type">
                  Type: {item.types[0].type.name}
                  {getTypeDiscount(item) > 0 && (
                    <span className="discount-badge">
                      {(getTypeDiscount(item) * 100).toFixed(0)}% descuento
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="item-actions">
            <div className="quantity-controls">
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                className="quantity-btn"
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>

            <div className="price-info">
              <div className="subtotal">
                ${calculateSubtotal(item).toFixed(2)}
              </div>
              <div className="unit-price">
                ${calculatePrice(item).toFixed(2)}/cu
              </div>
            </div>

            <button
              onClick={() => handleRemoveItem(item.id)}
              className="remove-btn"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="cart-total">
        <div className="price-details">
          <div className="total-amount">
            Total: ${calculateTotal().toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;