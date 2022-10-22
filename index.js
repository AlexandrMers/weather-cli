#!/usr/bin/env node

// Helpers
import { getArgs } from "./helpers/getArgs.js";

// Services
import { logServices, storageServices, apiServices } from "./services/index.js";

const saveToken = async (token = "") => {
  try {
    await storageServices.saveKeyValueToHomeDir("token", token);
    logServices.success("Токен успешно создан!");
  } catch (e) {
    logServices.error(e.message);
  }
};

const getToken = async (key = "") => {
  try {
    const token = await storageServices.getValue(key);
    return token;
  } catch (error) {
    logServices.error(
      "Нет токена в системе. Пожалуйста, воспользуйтесь установкой токен -t [TOKEN]"
    );
  }
};

const initCli = async () => {
  const args = getArgs(process.argv);

  if (args.h) {
    logServices.printHelp();
  }

  if (args.t) {
    saveToken(args.t);
    return;
  }

  if (args.s) {
    // Сохранение города
  }

  try {
    const token = process.env.TOKEN ?? (await getToken("token"));
    const city = process.env.CITY;
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

initCli();
