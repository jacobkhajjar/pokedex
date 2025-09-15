import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js"
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";

import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
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
    explore: {
      name: "explore",
      description: "'explore [location]' Displays a list of pokemon found at the location",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "`catch [pokemon]` Attempts to catch the pokemon",
      callback: commandCatch
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exits the Pokedex",
      callback: commandExit,
    },
  };
}