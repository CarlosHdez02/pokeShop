import { Pokemon } from "../interface/Pokemons.interface";

export const calculatePokemonPrice = (pokemon: Partial<Pokemon>) => {

    const getStatValue = (statName: string): number => {
        const stat = pokemon.stats?.find(s => s.stat.name === statName);
        return stat ? stat.base_stat : 0;
    };


    const basePrice = (
        getStatValue('hp') * 1.0 +
        getStatValue('attack') * 1.5 +
        getStatValue('defense') * 1.2 +
        getStatValue('special-attack') * 1.8 +
        getStatValue('special-defense') * 1.4 +
        getStatValue('speed') * 1.3
    );


    let priceMultiplier = 1.0;
    if (pokemon.types && pokemon.types.length > 0) {
        const type = pokemon.types[0].type.name;
        switch (type) {
            case 'Legendary':
                priceMultiplier = 2.5;
                break;
            case 'Dragon':
                priceMultiplier = 1.8;
                break;
            case 'Ghost':
                priceMultiplier = 1.6;
                break;
            case 'Psychic':
                priceMultiplier = 1.5;
                break;
            case 'Normal':
                priceMultiplier = 1.0;
                break;
            default:
                priceMultiplier = 1.1;
        }
    }

    let finalPrice = basePrice * priceMultiplier;


    if (pokemon.types && pokemon.types.length > 0) {
        const type = pokemon.types[0].type.name;
        switch (type) {
            case 'Fire':
                finalPrice *= 0.9;
                break;
            case 'Water':
                finalPrice *= 0.85;
                break;
            case 'Grass':
                finalPrice *= 0.88;
                break;
        }
    }

    return finalPrice;
};