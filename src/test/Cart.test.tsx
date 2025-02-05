import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from '../pages/Cart/Cart';
import { CartContext } from '../context/CartProvider';
import { CartContextInterface } from '../interface/cart.interface';
import { Pokemon } from '../interface/Pokemons.interface';


const mockPokemon: Partial<Pokemon> = {
  id: 1,
  name: "bulbasaur",
  base_experience: 64,
  height: 7,
  image: "bulbasaur.jpg",
  is_default: true,
  order: 1,
  weight: 69,
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: { name: "hp", url: "" },
      attack: 49,
      hp: 45,
      speed: 45,
      stats: null
    },
    {
      base_stat: 49,
      effort: 0,
      stat: { name: "attack", url: "" },
      attack: 49,
      hp: 45,
      speed: 45,
      stats: null
    },
    {
      base_stat: 49,
      effort: 0,
      stat: { name: "defense", url: "" },
      attack: 49,
      hp: 45,
      speed: 45,
      stats: null
    },
    {
      base_stat: 65,
      effort: 0,
      stat: { name: "special-attack", url: "" },
      attack: 49,
      hp: 45,
      speed: 45,
      stats: null
    },
    {
      base_stat: 65,
      effort: 0,
      stat: { name: "special-defense", url: "" },
      attack: 49,
      hp: 45,
      speed: 45,
      stats: null
    },
    {
      base_stat: 45,
      effort: 0,
      stat: { name: "speed", url: "" },
      attack: 49,
      hp: 45,
      speed: 45,
      stats: null
    }
  ],
  types: [
    {
      slot: 1,
      type: { name: "grass", url: "" }
    }
  ],
  sprites: {
    front_default: "front.jpg",
    front_shiny: "front-shiny.jpg",
    back_default: "back.jpg",
    back_shiny: "back-shiny.jpg",
    other: {
      "official-artwork": {
        front_default: "official.jpg"
      }
    }
  }
};

interface CartPokemon extends Partial<Pokemon> {
  quantity: number;
}

const mockCartContext: CartContextInterface = {
  cartPokemons: [{ ...mockPokemon, quantity: 1 } as CartPokemon],
  handleRemoveFromCart: vi.fn(),
  handleAddToCart: vi.fn(),
  handleClearCart: vi.fn(),
  handleUpdateQuantity: vi.fn(),
};
const renderWithContext = (
  component: React.ReactNode, 
  contextValue: CartContextInterface = mockCartContext
) => {
  return render(
    <CartContext.Provider value={contextValue}>
      {component}
    </CartContext.Provider>
  );
};

describe('Cart Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders empty cart message when no items', () => {
    const emptyCartContext: CartContextInterface = { 
      ...mockCartContext, 
      cartPokemons: [] 
    };
    renderWithContext(<Cart />, emptyCartContext);

    expect(screen.getByText('There are no pokemons in cart, add some!')).toBeInTheDocument();
  });

  test('renders cart with items correctly', () => {
    renderWithContext(<Cart />);

    expect(screen.getByText('Shopping cart')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });
  test('updates quantity and recalculates total correctly', async () => {
    renderWithContext(<Cart />);
    const user = userEvent.setup();

    const plusButton = screen.getByRole('button', { name: '+' });
    await user.click(plusButton);

   
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('removes item from cart', async () => {
    renderWithContext(<Cart />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(deleteButton);

    expect(mockCartContext.handleRemoveFromCart).toHaveBeenCalledWith(mockPokemon.id);
  });

  test('displays correct discount for types with discount', () => {
    renderWithContext(<Cart />);
    expect(screen.getByText('12% descuento')).toBeInTheDocument();
  });

  test('applies correct type discounts', () => {
    const cartWithMultipleTypes: CartContextInterface = {
      ...mockCartContext,
      cartPokemons: [
        { ...mockPokemon, quantity: 1 } as CartPokemon,
        {
          ...mockPokemon,
          id: 2,
          name: 'charmander',
          types: [{ slot: 1, type: { name: 'fire', url: '' } }],
          quantity: 1
        } as CartPokemon
      ]
    };

    renderWithContext(<Cart />, cartWithMultipleTypes);

  
    expect(screen.getByText('12% descuento')).toBeInTheDocument();

    expect(screen.getByText('10% descuento')).toBeInTheDocument();
  });


  test('calculates total correctly with multiple items', () => {
    const multiplePokemons: CartContextInterface = {
      ...mockCartContext,
      cartPokemons: [
        { ...mockPokemon, quantity: 1 } as CartPokemon,
        {
          ...mockPokemon,
          id: 2,
          name: 'charmander',
          types: [
            {
              slot: 1,
              type: { name: 'fire', url: "" }
            }
          ],
          quantity: 1
        } as CartPokemon
      ]
    };

    renderWithContext(<Cart />, multiplePokemons);

    expect(screen.getByText(/Total:/)).toBeInTheDocument();
  });
});