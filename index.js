#!/usr/bin/env node

import { getArgs } from "./helpers/getArgs.js";

const initCli = () => {
  const args = getArgs(process.argv);

  console.log("arguments check ->", args);
};

initCli();
