import chalk from "chalk";

const printHelpMessage = () =>
  `${chalk.bgCyan(
    "HELP INFO:"
  )}\nЕсли не переданы параметры - вывод погоды\n-s [CITY] - для установки города\n-h - для вывода помощи\n-t [API_KEY] - для сохранения токена`;

export const printHelp = () => {
  console.log(printHelpMessage());
};

export const success = (msg) => {
  console.log(`${chalk.bgGreen(" УСПЕШНО ")} ${msg}`);
};

export const error = (msg) => {
  console.log(`${chalk.bgRed(" ПРОИЗОШЛА ОШИБКА ")} ${msg}`);
};

export const printWeather = (weather, icon) => {
  console.log(
    `${chalk.bgBlackBright(" ПОГОДА В ГОРОДЕ: ")}${weather.name}\n${icon}  ${
      weather.weather[0].description
    }\n🌡️   Температура: ${weather.main.temp} (ощущается как ${
      weather.main.feels_like
    })\n🌊  Влажность: ${weather.main.humidity}%\n🌬️   Скорость ветра: ${
      weather.wind.speed
    }`
  );
};
