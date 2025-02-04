
export function setPokemon(key: string, value: unknown) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value)) // localsstorage only allows strings

    } catch (err) {
        console.error(err)
    }
}

export function getItem(key:string){
    try{
        const pokemon = window.localStorage.getItem(key)
        return pokemon ? JSON.parse(pokemon) : undefined
    }catch(err){
        console.error(err)
    }
}