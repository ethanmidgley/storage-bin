import { readFile, rm } from "fs/promises";
import path from "path";

export const get = async (id: string) => {
  return await readFile(path.join(__dirname, "../storage", id));
};

export const remove = async (id: string) => {
  return await rm(path.join(__dirname, "../storage", id));
};

export default {
  get: get,
  remove: remove,
};
