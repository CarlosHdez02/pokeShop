import React from "react";
import { getItem, setPokemon } from "../utils/LocalStorage";
export function usePersistedState(key, initialValue) {
    //  custom hook to handle persisted state on shopping cart
    const [persistedPokemon, setpersistedPokemon] = React.useState(() => {
        const pokemon = getItem(key);
        return pokemon || [] || initialValue;
    });
    React.useEffect(() => {
        setPokemon(key, persistedPokemon);
    }, [persistedPokemon]);
    return [persistedPokemon, setpersistedPokemon];
}
