import type { State } from "./state.js";

export async function commandPokedex(state:State) {
    
    if (Object.keys(state.caughtPokemon).length === 0) {
        console.log("Your pokedex is empty. Catch Pokemon with catch <pokemon_name>");
        return;
    }
    
    console.log("Your Pokedex:")
    for (const pokemon of Object.keys(state.caughtPokemon)) {
        console.log(`  - ${pokemon}`)
    }
}