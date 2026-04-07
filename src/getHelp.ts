export const getHelp = (inclHeader = false) => {
  let help = "";
  if (inclHeader) {
    help += "Identify Monorepo Root\n";
    help += "Find the root directory of a monorepo from anywhere inside it.\n";
  }
  help += "\n";
  help += "Usage:\n";
  help += "cd [YOUR_DESIRED_REPOSITORY]\n";
  help += "identify-monorepo-root\n";

  help += "\n";
  help += "You may run this command anywhere inside a repository. It prints the detected root path.";

  return help;
};
