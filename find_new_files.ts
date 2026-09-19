import * as fs from "fs";
import * as path from "path";

const now = Date.now();
const oneHour = 60 * 60 * 1000;

function findNewFiles(dir: string) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      try {
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
          if (
            file !== "node_modules" &&
            file !== ".git" &&
            file !== "proc" &&
            file !== "sys" &&
            file !== "dev" &&
            file !== "lib" &&
            file !== "usr" &&
            file !== "var" &&
            file !== "run"
          ) {
            findNewFiles(fullPath);
          }
        } else {
          if (now - stats.mtimeMs < oneHour) {
            console.log("New file found:", fullPath, "Modified:", new Date(stats.mtimeMs));
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}

console.log("Searching for files created/modified in the last hour...");
findNewFiles("/");
