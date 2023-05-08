export const getHelp = (inclHeader = false) => {
  let help = "";
  if (inclHeader) {
    help += "Identify Monorepo Root\n";
    help +=
      "Find the root directory of any given monorepo (works with npm, yarn, pnpm, turbo, etc.)\n";
  }
  help += "\n";
  help += "Usage:\n";
  help += "cd [YOUR_DESIRED_REPOSITORY]\n";
  help += "identify-monorepo-root\n";

  help += "\n";
  help += "(you may run this command anywhere inside your given repo - you don't have to be in its root directory, otherwise this would defeat this library's purpose :)";

  return help;
};
