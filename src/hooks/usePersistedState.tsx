import React from "react";
import { getItem, setPokemon } from "../utils/LocalStorage";
import { CartItem } from "../context/CartProvider";

export function usePersistedState<T>(key:string,initialValue:T){
    //  custom hook to handle persisted state on shopping cart
const [persistedPokemon, setpersistedPokemon] = React.useState<CartItem[]>( ()=>{
        const pokemon = getItem(key)
        return pokemon || [] || initialValue
    });

    React.useEffect(()=>{
        setPokemon(key,persistedPokemon)
    },[persistedPokemon])   

    return [persistedPokemon, setpersistedPokemon] as const
}