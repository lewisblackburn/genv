import type { Arguments, CommandBuilder } from "yargs";
import fs from "fs";
import path from "path";
import os from "os";

type Options = {
  project: string;
  variable: string;
  data: string;
};

export const command: string = "add <project> <variable> <data>";
export const desc: string = "add a <project> <variable> with <data>";

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({})
    .positional("project", { type: "string", demandOption: true })
    .positional("variable", { type: "string", demandOption: true })
    .positional("data", { type: "string", demandOption: true });

export const handler = (argv: Arguments<Options>): void => {
  const { project, variable, data } = argv;

  fs.mkdir(path.join(os.tmpdir(), "genv"), (err) => {
    console.log(err);
  });

  if (!fs.existsSync(path.join(os.tmpdir(), "genv", `${project}.json`))) {
    fs.writeFileSync(path.join(os.tmpdir(), "genv", `${project}.json`), "{}", {
      encoding: "utf8",
    });
  }

  const json = fs.readFileSync(
    path.join(os.tmpdir(), "genv", `${project}.json`),
    {
      encoding: "utf8",
    }
  );

  const parsed = JSON.parse(json);

  parsed[variable] = data;

  fs.writeFileSync(
    path.join(os.tmpdir(), "genv", `${project}.json`),
    JSON.stringify(parsed),
    {
      encoding: "utf8",
    }
  );

  process.stdout.write(`added ${variable} in ${project}`);

  process.exit(0);
};
