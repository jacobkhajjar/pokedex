import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
    rl: Interface,
    commands: Record<string, CLICommand>,
    pokeAPI: PokeAPI,
    nextLocationsURL?: string,
    prevLocationsURL?: string,
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const commands = getCommands();

    const pokeAPI = new PokeAPI()

    return {rl: rl, commands: commands, pokeAPI: pokeAPI};
}