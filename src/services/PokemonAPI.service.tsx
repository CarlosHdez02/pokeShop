import { 
    Pokemon, 
    PokemonListResponse, 

  } from '../interface/Pokemons.interface';
  
  export class PokemonAPI {
    public baseUrl = 'https://pokeapi.co/api/v2';
  
    public async fetchPokemons(offset = 0, limit = 21): Promise<PokemonListResponse> {
      try {
        const response = await fetch(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const results = await Promise.all(
          data.results.map((pokemon: { name: string; url: string }) => 
            this.fetchPokemonDetails(pokemon.url)
          )
        );
        
        return {
          count: data.count,
          next: data.next,
          previous: data.previous,
          results: results
        };
      } catch (err) {
        console.error("Error fetching Pokémon list:", err);
        throw err;
      }
    }
  
    public async fetchPokemonsByType(type: string, offset = 0, limit = 20): Promise<Pokemon[]> {
      try {
        const response = await fetch(`${this.baseUrl}/type/${type}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
          data.pokemon
            .slice(offset, offset + limit)
            .map((p: { pokemon: { name: string; url: string } }) => 
              this.fetchPokemonDetails(p.pokemon.url)
            )
        );
        
        return pokemonDetails;
      } catch (err) {
        console.error(`Error fetching Pokémon of type ${type}:`, err);
        throw err;
      }
    }
  
    public async fetchPokemonDetails(url: string): Promise<Pokemon> {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
  
        return {
          id: data.id,
          name: data.name,
          base_experience: data.base_experience,
          height: data.height,
          image: data.sprites.other?.["official-artwork"]?.front_default || data.sprites.front_default,
          is_default: data.is_default,
          order: data.order,
          weight: data.weight,
          abilities: data.abilities.map((a: any) => ({
            ability: {
              name: a.ability.name,
              url: a.ability.url
            },
            is_hidden: a.is_hidden,
            slot: a.slot
          })),
          forms: data.forms.map((f: any) => ({
            name: f.name,
            url: f.url
          })),
          location_area_encounters: data.location_area_encounters,
          species: {
            name: data.species.name,
            url: data.species.url
          },
          sprites: {
            front_default: data.sprites.front_default,
            front_shiny: data.sprites.front_shiny,
            back_default: data.sprites.back_default,
            back_shiny: data.sprites.back_shiny,
            other: {
              "official-artwork": {
                front_default: data.sprites.other?.["official-artwork"]?.front_default
              }
            }
          },
          stats: data.stats.map((s: any) => ({
            base_stat: s.base_stat,
            effort: s.effort,
            stat: {
              name: s.stat.name,
              url: s.stat.url
            }
          })),
          types: data.types.map((t: any) => ({
            slot: t.slot,
            type: {
              name: t.type.name,
              url: t.type.url
            }
          }))
        };
      } catch (err) {
        console.error("Error fetching Pokémon details:", err);
        throw err;
      }
    }
  }