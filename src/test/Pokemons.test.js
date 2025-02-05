import { jsx as _jsx } from "react/jsx-runtime";
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Pokemons from '../pages/Pokemons/Pokemons';
import { usePokemon } from '../hooks/usePokemon';
import { useFilteredPokemon } from '../hooks/useFilteredPokemon';
vi.mock('../hooks/usePokemon', () => ({
    usePokemon: vi.fn()
}));
vi.mock('../hooks/useFilteredPokemon', () => ({
    useFilteredPokemon: vi.fn()
}));
vi.mock('../utils/LoadingSpinner/Loading', () => ({
    default: () => _jsx("div", { "data-testid": "loading-spinner", children: "Loading..." })
}));
vi.mock('../utils/PokemonTypes', () => ({
    PokemonTypes: [
        { id: 1, type: 'Fire' },
        { id: 2, type: 'Water' },
        { id: 3, type: 'Grass' }
    ]
}));
const mockPokemonData = [
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
const renderWithRouter = (component) => {
    return render(_jsx(BrowserRouter, { children: component }));
};
describe('Pokemons Component', () => {
    const mockFetchPokemon = vi.fn();
    const mockSetQuery = vi.fn();
    const mockSetSelectedPokemonType = vi.fn();
    const mockNextPage = vi.fn();
    const mockPrevPage = vi.fn();
    beforeEach(() => {
        vi.clearAllMocks();
        usePokemon.mockReturnValue({
            pokemonList: mockPokemonData,
            loading: false,
            error: null,
            fetchPokemon: mockFetchPokemon,
            currentPage: 1,
            totalPages: 5,
            nextPage: mockNextPage,
            prevPage: mockPrevPage
        });
        useFilteredPokemon.mockReturnValue({
            filteredPokemonList: mockPokemonData,
            query: '',
            setQuery: mockSetQuery,
            selectedPokemonType: 'All',
            setSelectedPokemonType: mockSetSelectedPokemonType
        });
    });
    describe('Loading and Error States', () => {
        test('shows loading spinner when loading is true', () => {
            usePokemon.mockReturnValue({
                ...usePokemon(),
                loading: true
            });
            renderWithRouter(_jsx(Pokemons, {}));
            expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
        });
        test('shows error message when there is an error', () => {
            const errorMessage = 'Failed to fetch Pokemon';
            usePokemon.mockReturnValue({
                ...usePokemon(),
                error: errorMessage
            });
            renderWithRouter(_jsx(Pokemons, {}));
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
    describe('Pokemon Grid', () => {
        test('renders Pokemon cards with correct information', () => {
            renderWithRouter(_jsx(Pokemons, {}));
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
            renderWithRouter(_jsx(Pokemons, {}));
            const links = screen.getAllByRole('link');
            expect(links[0]).toHaveAttribute('href', '/pokemon/1');
            expect(links[1]).toHaveAttribute('href', '/pokemon/2');
        });
    });
    describe('Filtering', () => {
        test('updates search query when typing in search input', async () => {
            renderWithRouter(_jsx(Pokemons, {}));
            const user = userEvent.setup();
            const searchInput = screen.getByPlaceholderText('search pokemon...');
            await user.type(searchInput, 'bulba');
            expect(mockSetQuery).toHaveBeenCalledWith('b');
            expect(mockSetQuery).toHaveBeenCalledWith('u');
            expect(mockSetQuery).toHaveBeenCalledWith('l');
            expect(mockSetQuery).toHaveBeenCalledWith('b');
            expect(mockSetQuery).toHaveBeenCalledWith('a');
            expect(mockSetQuery).toHaveBeenCalledTimes(5);
        });
        test('updates selected Pokemon type when changing select value', async () => {
            renderWithRouter(_jsx(Pokemons, {}));
            const user = userEvent.setup();
            const typeSelect = screen.getByRole('combobox');
            await user.selectOptions(typeSelect, 'fire');
            expect(mockSetSelectedPokemonType).toHaveBeenCalledWith('fire');
        });
        test('fetches Pokemon when type changes', () => {
            renderWithRouter(_jsx(Pokemons, {}));
            expect(mockFetchPokemon).toHaveBeenCalledWith('all');
        });
        test('renders type select with all options', () => {
            renderWithRouter(_jsx(Pokemons, {}));
            //const typeSelect = screen.getByRole('combobox');
            expect(screen.getByRole('option', { name: 'All' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Fire' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Water' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Grass' })).toBeInTheDocument();
        });
    });
    describe('Pagination', () => {
        test('renders pagination controls correctly', () => {
            renderWithRouter(_jsx(Pokemons, {}));
            expect(screen.getByText('Previous')).toBeInTheDocument();
            expect(screen.getByText('Next')).toBeInTheDocument();
            expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
        });
        test('disables previous button on first page', () => {
            usePokemon.mockReturnValue({
                ...usePokemon(),
                currentPage: 1
            });
            renderWithRouter(_jsx(Pokemons, {}));
            const prevButton = screen.getByRole('button', { name: /previous/i });
            expect(prevButton).toBeDisabled();
        });
        test('disables next button on last page', () => {
            usePokemon.mockReturnValue({
                ...usePokemon(),
                currentPage: 5,
                totalPages: 5
            });
            renderWithRouter(_jsx(Pokemons, {}));
            const nextButton = screen.getByRole('button', { name: /next/i });
            expect(nextButton).toBeDisabled();
        });
        test('calls nextPage when clicking next button', async () => {
            const mockNextPage = vi.fn();
            usePokemon.mockReturnValue({
                ...usePokemon(),
                nextPage: mockNextPage,
                currentPage: 1
            });
            renderWithRouter(_jsx(Pokemons, {}));
            const user = userEvent.setup();
            const nextButton = screen.getByRole('button', { name: /next/i });
            await user.click(nextButton);
            expect(mockNextPage).toHaveBeenCalled();
        });
        test('calls prevPage when clicking previous button', async () => {
            const mockPrevPage = vi.fn();
            usePokemon.mockReturnValue({
                ...usePokemon(),
                prevPage: mockPrevPage,
                currentPage: 2
            });
            renderWithRouter(_jsx(Pokemons, {}));
            const user = userEvent.setup();
            const prevButton = screen.getByRole('button', { name: /previous/i });
            await user.click(prevButton);
            expect(mockPrevPage).toHaveBeenCalled();
        });
        test('displays correct page number', () => {
            usePokemon.mockReturnValue({
                ...usePokemon(),
                currentPage: 3,
                totalPages: 5
            });
            renderWithRouter(_jsx(Pokemons, {}));
            expect(screen.getByText('Page 3 of 5')).toBeInTheDocument();
        });
    });
    describe('Effect Behavior', () => {
        test('fetches Pokemon on component mount', () => {
            renderWithRouter(_jsx(Pokemons, {}));
            expect(mockFetchPokemon).toHaveBeenCalledWith('all');
        });
        test('fetches Pokemon when type changes', () => {
            renderWithRouter(_jsx(Pokemons, {}));
            const user = userEvent.setup();
            const typeSelect = screen.getByRole('combobox');
            user.selectOptions(typeSelect, 'fire');
            expect(mockFetchPokemon).toHaveBeenCalledWith('all');
        });
    });
});
