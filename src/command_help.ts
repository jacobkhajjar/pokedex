import type { State } from "./state.js"

export function commandHelp(state: State) {
    const commands = state.commands

    console.log("\nWelcome to the Pokedex!\nUsage:\n")

    for (const command of Object.values(commands)) {
        console.log(`${command.name}: ${command.description}`)
    }

    console.log();
}