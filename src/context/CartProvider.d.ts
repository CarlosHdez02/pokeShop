import React from "react";
import { CartContextInterface } from "../interface/cart.interface";
import { Pokemon } from "../interface/Pokemons.interface";
export interface CartItem extends Partial<Pokemon> {
    quantity: number;
}
export declare const CartContext: React.Context<CartContextInterface | null>;
export declare const CartProvider: React.FC<{
    children: React.ReactNode;
}>;
//# sourceMappingURL=CartProvider.d.ts.map