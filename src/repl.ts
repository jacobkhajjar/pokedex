import type { State } from "./state.js";

export async function startREPL(state: State) {
  const rl = state.rl;
  const commands = state.commands;

  rl.prompt();

  rl.on("line", async (input) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const args = words.slice(1);
    
    const cmd = commands[commandName];
    if (!cmd) {
      console.log(
        `Unknown command: "${commandName}". Type "help" for a list of commands.`,
      );
      rl.prompt();
      return;
    }

    try {
      await cmd.callback(state, ...args);
    } catch (e) {
      console.log((e as Error).message);
    }

    rl.prompt();
  });
}

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}
