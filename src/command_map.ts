import type { State } from "./state.js";

export async function commandMap(state:State) {
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL)
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    for (const location of locations.results) {
        console.log(location.name);
    }
}

export async function commandMapb(state:State) {
    if (!state.prevLocationsURL) {
        throw new Error("you're on the first page");
    } else {
        const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
        state.nextLocationsURL = locations.next;
        state.prevLocationsURL = locations.previous ?? undefined;
        for (const location of locations.results) {
            console.log(location.name);
        }
    }
}