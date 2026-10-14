import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const readRoot = (rel: string) => readFileSync(path.join(root, rel), "utf8");
