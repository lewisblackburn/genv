"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
exports.command = "remove <project> <variable>";
exports.desc = "remove <project> <variable>";
const builder = (yargs) => yargs
    .options({})
    .positional("project", { type: "string", demandOption: true })
    .positional("variable", { type: "string", demandOption: true });
exports.builder = builder;
const handler = (argv) => {
    const { project, variable } = argv;
    const json = fs_1.default.readFileSync(path_1.default.join(os_1.default.tmpdir(), "genv", `${project}.json`), {
        encoding: "utf8",
    });
    // remove the variable if it exists
    const parsed = JSON.parse(json);
    delete parsed[variable];
    fs_1.default.writeFileSync(path_1.default.join(os_1.default.tmpdir(), "genv", `${project}.json`), JSON.stringify(parsed), {
        encoding: "utf8",
    });
    process.stdout.write(`removed ${variable} in ${project}`);
    process.exit(0);
};
exports.handler = handler;
