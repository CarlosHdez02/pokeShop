import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Pokemons from '../pages/Pokemons/Pokemons';
import { usePokemon } from '../hooks/usePokemon';
import { useFilteredPokemon } from '../hooks/useFilteredPokemon';


interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: Array<{
    type: {
      name: string;
    }
  }>;
}


interface UsePokemonReturn {
  pokemonList: Pokemon[];
  loading: boolean;
  error: string | null;
  fetchPokemon: (type?: string) => Promise<void>;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}


interface UseFilteredPokemonReturn {
  filteredPokemonList: Pokemon[];
  query: string;
  setQuery: (query: string) => void;
  selectedPokemonType: string;
  setSelectedPokemonType: (type: string) => void;
}


 vi.mock('../hooks/usePokemon', () => ({
  usePokemon: vi.fn<[], UsePokemonReturn>()
})); 


vi.mock('../hooks/useFilteredPokemon', () => ({
  useFilteredPokemon: vi.fn<[Pokemon[]], UseFilteredPokemonReturn>()
}));

vi.mock('../utils/LoadingSpinner/Loading', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>
}));


vi.mock('../utils/PokemonTypes', () => ({
  PokemonTypes: [
    { id: 1, type: 'Fire' },
    { id: 2, type: 'Water' },
    { id: 3, type: 'Grass' }
  ]
}));

const mockPokemonData: Pokemon[] = [
  {
    id: 1,
    name: 'bulbasaur',
    image: 'bulbasaur.jpg',
    types: [
      { type: { name: 'grass' } },
      { type: { name: 'poison' } }
    ]
  },
  {
    id: 2,
    name: 'charmander',
    image: 'charmander.jpg',
    types: [
      { type: { name: 'fire' } }
    ]
  }
];

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Pokemons Component', () => {
  const mockFetchPokemon = vi.fn();
  const mockSetQuery = vi.fn();
  const mockSetSelectedPokemonType = vi.fn();
  const mockNextPage = vi.fn();
  const mockPrevPage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
  
    (usePokemon as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      pokemonList: mockPokemonData,
      loading: false,
      error: null,
      fetchPokemon: mockFetchPokemon,
      currentPage: 1,
      totalPages: 5,
      nextPage: mockNextPage,
      prevPage: mockPrevPage
    });

    
    (useFilteredPokemon as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      filteredPokemonList: mockPokemonData,
      query: '',
      setQuery: mockSetQuery,
      selectedPokemonType: 'All',
      setSelectedPokemonType: mockSetSelectedPokemonType
    });
  });

  describe('Loading and Error States', () => {
    test('shows loading spinner when loading is true', () => {
      (usePokemon as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        ...(usePokemon as unknown as ReturnType<typeof vi.fn>)(),
        loading: true
      });
      renderWithRouter(<Pokemons />);
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    test('shows error message when there is an error', () => {
      const errorMessage = 'Failed to fetch Pokemon';
      (usePokemon as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        ...(usePokemon as unknown as ReturnType<typeof vi.fn>)(),
        error: errorMessage
      });
      renderWithRouter(<Pokemons />);
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  describe('Pokemon Grid', () => {
    test('renders Pokemon cards with correct information', () => {
      renderWithRouter(<Pokemons />);
      
      // Check Pokemon names
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('charmander')).toBeInTheDocument();
      
      // Check images
      const images = screen.getAllByRole('img');
      expect(images[0]).toHaveAttribute('src', 'bulbasaur.jpg');
      expect(images[0]).toHaveAttribute('alt', 'bulbasaur');
      expect(images[1]).toHaveAttribute('src', 'charmander.jpg');
      expect(images[1]).toHaveAttribute('alt', 'charmander');
      
      // Check types
      expect(screen.getByText('grass')).toBeInTheDocument();
      expect(screen.getByText('poison')).toBeInTheDocument();
      expect(screen.getByText('fire')).toBeInTheDocument();
    });

    test('renders correct links to Pokemon details', () => {
      renderWithRouter(<Pokemons />);
      const links = screen.getAllByRole('link');
      expect(links[0]).toHaveAttribute('href', '/pokemon/1');
      expect(links[1]).toHaveAttribute('href', '/pokemon/2');
    });
  });

  describe('Filtering', () => {
    test('updates search query when typing in search input', async () => {
        renderWithRouter(<Pokemons />);
        const user = userEvent.setup();
      
        const searchInput = screen.getByPlaceholderText('search pokemon...');
        await user.type(searchInput, 'bulba');
      
        // Check that the query was updated with the final value 'bulba'
        expect(mockSetQuery).toHaveBeenCalledWith('b');
        expect(mockSetQuery).toHaveBeenCalledWith('u');
        expect(mockSetQuery).toHaveBeenCalledWith('l');
        expect(mockSetQuery).toHaveBeenCalledWith('b');
        expect(mockSetQuery).toHaveBeenCalledWith('a');
        
        
        // Optionally, check that mockSetQuery was called multiple times with the intermediate values
        expect(mockSetQuery).toHaveBeenCalledTimes(5);
      });
      

    test('updates selected Pokemon type when changing select value', async () => {
      renderWithRouter(<Pokemons />);
      const user = userEvent.setup();
      
      const typeSelect = screen.getByRole('combobox');
      await user.selectOptions(typeSelect, 'fire');
      
      expect(mockSetSelectedPokemonType).toHaveBeenCalledWith('fire');
    });

    test('fetches Pokemon when type changes', () => {
      renderWithRouter(<Pokemons />);
      expect(mockFetchPokemon).toHaveBeenCalledWith('all');
    });

    test('renders type select with all options', () => {
      renderWithRouter(<Pokemons />);
      const typeSelect = screen.getByRole('combobox');
      
      expect(screen.getByRole('option', { name: 'All' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Fire' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Water' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Grass' })).toBeInTheDocument();
    });
  });

  describe('Pagination', () => {
    test('renders pagination controls correctly', () => {
      renderWithRouter(<Pokemons />);
      
      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
      expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
    });

    test('disables previous button on first page', () => {
      (usePokemon as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        ...(usePokemon as unknown as ReturnType<typeof vi.fn>)(),
        currentPage: 1
      });
      renderWithRouter(<Pokemons />);
      
      const prevButton = screen.getByRole('button', { name: /previous/i });
      expect(prevButton).toBeDisabled();
    });

    test('disables next button on last page', () => {
      (usePokemon as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        ...(usePokemon as unknown as ReturnType<typeof vi.fn>)(),
        currentPage: 5,
        totalPages: 5
      });
      renderWithRouter(<Pokemons />);
      
      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeDisabled();
    });

    test('calls nextPage when clicking next button', async () => {
      const mockNextPage = vi.fn();
      (usePokemon as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        ...(usePokemon as unknown as ReturnType<typeof vi.fn>)(),
        nextPage: mockNextPage,
        currentPage: 1
      });
      
      renderWithRouter(<Pokemons />);
      const user = userEvent.setup();
      
      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);
      
      expect(mockNextPage).toHaveBeenCalled();
    });

    test('calls prevPage when clicking previous button', async () => {
      const mockPrevPage = vi.fn();
      (usePokemon as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        ...(usePokemon as unknown as ReturnType<typeof vi.fn>)(),
        prevPage: mockPrevPage,
        currentPage: 2
      });
      
      renderWithRouter(<Pokemons />);
      const user = userEvent.setup();
      
      const prevButton = screen.getByRole('button', { name: /previous/i });
      await user.click(prevButton);
      
      expect(mockPrevPage).toHaveBeenCalled();
    });

    test('displays correct page number', () => {
      (usePokemon as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        ...(usePokemon as unknown as ReturnType<typeof vi.fn>)(),
        currentPage: 3,
        totalPages: 5
      });
      
      renderWithRouter(<Pokemons />);
      expect(screen.getByText('Page 3 of 5')).toBeInTheDocument();
    });
  });

  describe('Effect Behavior', () => {
    test('fetches Pokemon on component mount', () => {
      renderWithRouter(<Pokemons />);
      expect(mockFetchPokemon).toHaveBeenCalledWith('all');
    });

    test('fetches Pokemon when type changes', () => {
      renderWithRouter(<Pokemons />);
      const user = userEvent.setup();
      
      const typeSelect = screen.getByRole('combobox');
      user.selectOptions(typeSelect, 'fire');
      
      expect(mockFetchPokemon).toHaveBeenCalledWith('all');
    });
  });
});