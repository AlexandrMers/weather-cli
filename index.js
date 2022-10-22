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
    try {
      const token = await getToken("token");

      const weatherData = await apiServices.getWeather(token, args.s);
      console.log("weatherData ->", weatherData);
    } catch (e) {
      logServices.error(e.message);
    }
  }
};

initCli();
