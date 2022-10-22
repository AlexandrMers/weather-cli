import chalk from "chalk";

const printHelpMessage = () =>
  `${chalk.bgCyan(
    "HELP INFO:"
  )}\nЕсли не переданы параметры - вывод погоды\n-s [CITY] - для установки города\n-h - для вывода помощи\n-t [API_KEY] - для сохранения токена`;

export const printHelp = () => {
  console.log(printHelpMessage());
};
