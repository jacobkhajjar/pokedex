import type { State } from "./state.js";

export async function commandCatch(state:State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("Invalid catch format. Usage: catch [pokemon]")
    }
    
    const pokemon = await state.pokeAPI.fetchPokemon(args[0])

    console.log(`Throwing a Pokeball at ${pokemon.name}...`)

    const success = Math.random() * pokemon.base_experience <= 40

    if (success) {
        state.caughtPokemon[pokemon.name] = pokemon
    }

    console.log(
        success ? `${pokemon.name} was caught!`
        : `${pokemon.name} escaped!`
    )
}