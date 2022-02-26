import type { Arguments, CommandBuilder } from "yargs";
import fs from "fs";
import path from "path";
import os from "os";

type Options = {
  project: string;
  variable: string;
};

export const command: string = "remove <project> <variable>";
export const desc: string = "remove <project> <variable>";

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({})
    .positional("project", { type: "string", demandOption: true })
    .positional("variable", { type: "string", demandOption: true });

export const handler = (argv: Arguments<Options>): void => {
  const { project, variable } = argv;

  const json = fs.readFileSync(
    path.join(os.tmpdir(), "genv", `${project}.json`),
    {
      encoding: "utf8",
    }
  );

  // remove the variable if it exists
  const parsed = JSON.parse(json);
  delete parsed[variable];
  fs.writeFileSync(
    path.join(os.tmpdir(), "genv", `${project}.json`),
    JSON.stringify(parsed),
    {
      encoding: "utf8",
    }
  );

  process.stdout.write(`removed ${variable} in ${project}`);

  process.exit(0);
};
