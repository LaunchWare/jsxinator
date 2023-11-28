/* eslint-disable no-console */

import { Command } from "commander";
import { lstat } from "fs/promises";
import { moveJsx } from "./moveJsx.js";

export const jsxinator = new Command();

jsxinator
  .name("jsxinator")
  .description("change jsx in js and ts files to jsx and tsx")
  .version("0.0.1");

jsxinator.argument("<directory>", "directory to search for files to rename");

jsxinator.action(async (directory: string) => {
  const { default: chalk } = await import("chalk");
  let stat;
  try {
    stat = await lstat(directory);
    moveJsx(`${directory}/**/*.[jt]s`);
  } catch (e) {
    //no-op
  }
  if (!stat || !stat.isDirectory()) {
    console.log(chalk.red(`Error: ${directory} is not a directory`));
    process.exit(1);
  }
});

jsxinator.parse(process.argv);
