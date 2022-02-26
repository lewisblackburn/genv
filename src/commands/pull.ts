import type { Arguments, CommandBuilder } from "yargs";
import fs from "fs";
import path from "path";
import os from "os";
import { toEnv } from "../utils/toEnv";

type Options = {
  project: string;
};

export const command: string = "pull <project>";
export const desc: string = "pull <project>";

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({})
    .positional("project", { type: "string", demandOption: true });

export const handler = (argv: Arguments<Options>): void => {
  const { project } = argv;

  if (fs.existsSync(path.join(os.tmpdir(), "genv", `${project}.json`))) {
    const json = fs.readFileSync(
      path.join(os.tmpdir(), "genv", `${project}.json`),
      {
        encoding: "utf8",
      }
    );

    const envs = toEnv(json);

    fs.writeFileSync(path.join(process.cwd(), ".env"), envs, {
      encoding: "utf8",
    });
  }

  process.exit(0);
};
