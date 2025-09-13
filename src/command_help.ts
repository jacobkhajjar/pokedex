import type { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex!\nUsage:\n")
    for (const command of Object.keys(commands)) {
        console.log(`${commands[command].name}: ${commands[command].description}`)
    }
}