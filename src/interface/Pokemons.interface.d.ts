export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    image: string;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Ability[];
    forms: NamedAPIResource[];
    location_area_encounters: string;
    species: NamedAPIResource;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
}
export interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}
export interface NamedAPIResource {
    name: string;
    url: string;
}
export interface Sprites {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
    other: {
        "official-artwork": {
            front_default: string;
        };
    };
}
export interface Stat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
    attack: number;
    hp: number;
    speed: number;
    stats: string | any;
}
export interface Type {
    slot: number;
    type: NamedAPIResource;
}
export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Partial<Pokemon>[];
}
//# sourceMappingURL=Pokemons.interface.d.ts.map