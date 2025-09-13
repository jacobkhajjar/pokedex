import { commandExit } from "./command_exit.js"
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";

import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays a list of 20 locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Returns to the previous list of 20 locations",
      callback: commandMapb,
    },
    exit: {
      name: "exit",
      description: "Exits the Pokedex",
      callback: commandExit,
    },
  };
}