import type { State } from "./state.js";

export async function commandExplore(state:State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("Invalid location format. Usage: explore [location]")
    }
    console.log(`Exploring ${args[0]}...`)
    console.log("Found Pokemon:")
    const location = await state.pokeAPI.fetchLocation(args[0])
    for (const encounter of location.pokemon_encounters) {
        console.log(`- ${encounter.pokemon.name}`);
    }
}