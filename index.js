#!/usr/bin/env node

// Helpers
import { getArgs } from "./helpers/getArgs.js";

// Services
import { logServices, storageServices, apiServices } from "./services/index.js";

// Constants
import { DICTIONARY } from "./constants.js";

const saveToken = async (token = "") => {
  try {
    await storageServices.saveKeyValueToHomeDir("token", token);
    logServices.success("Токен успешно создан!");
  } catch (e) {
    logServices.error(e.message);
  }
};

const saveCity = async (city = "") => {
  try {
    await storageServices.saveKeyValueToHomeDir("city", city);
    logServices.success("Город успешно сохранен");
  } catch (error) {
    logServices.error(error.message);
  }
};

const getValue = async (key = "", errorMessage) => {
  const value = await storageServices.getValue(key);
  if (value) {
    return value;
  }

  logServices.error(errorMessage);
  return undefined;
};

const getForecast = async () => {
  try {
    const token =
      process.env.TOKEN ??
      (await getValue(
        DICTIONARY.TOKEN,
        "Нет токена в системе. Пожалуйста, воспользуйтесь установкой токена -t [TOKEN]"
      ));

    const city =
      process.env.CITY ??
      (await getValue(
        DICTIONARY.CITY,
        "Нет города в системе. Пожалуйста, воспользуйтесь установкой города -s [CITY]"
      ));

    if (!token || !city) {
      return;
    }

    const weatherData = await apiServices.getWeather(token, city);

    // Красивый вывод погоды
    console.log("weatherData ->", weatherData);
  } catch (e) {
    if (e?.response?.status === 404) {
      logServices.error("Неправильно указано название города");
      return;
    }

    if (e?.response?.status === 401) {
      logServices.error("Неправильно указан токен");
      return;
    }

    logServices.error(e.message);
  }
};

const initCli = async () => {
  const args = getArgs(process.argv);

  if (args.h) {
    logServices.printHelp();
  }

  if (args.t) {
    await saveToken(args.t);
  }

  if (args.s) {
    await saveCity(args.s);
  }

  // Вывод прогноза погоды
  getForecast();
};

initCli();
