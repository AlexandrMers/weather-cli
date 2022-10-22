import { homedir } from "os";
import path from "path";
import fs from "fs";

const filePath = path.join(homedir(), "weather-data.json");

const isExist = async (path = "") => {
  try {
    const data = await fs.promises.stat(path);
    return Boolean(data);
  } catch (error) {
    return false;
  }
};

export const saveKeyValueToHomeDir = async (key, value) => {
  let data = {};

  if (await isExist(filePath)) {
    const fileData = await fs.promises.readFile(filePath);
    data = JSON.parse(fileData);
  }
  data[key] = value;

  await fs.promises.writeFile(filePath, JSON.stringify(data));
};

export const getValue = async (key = "") => {
  const data = await fs.promises.readFile(filePath);
  const result = JSON.parse(data);
  return result[key];
};
