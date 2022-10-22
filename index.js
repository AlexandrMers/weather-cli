#!/usr/bin/env node

// Helpers
import { getArgs } from "./helpers/getArgs.js";

// Services
import { logServices } from "./services/index.js";

const initCli = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    logServices.printHelp();
  }
};

initCli();
