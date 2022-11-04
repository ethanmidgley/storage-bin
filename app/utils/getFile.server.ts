import { readFile } from "fs/promises";
import path from "path";

export const getFile = async (id: string) => {
  return await readFile(path.join(__dirname, "../storage", id));
};
