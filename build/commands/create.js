"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
exports.command = "create <project>";
exports.desc = "create <project> namespace";
const builder = (yargs) => yargs
    .options({})
    .positional("project", { type: "string", demandOption: true });
exports.builder = builder;
const handler = (argv) => {
    const { project } = argv;
    if (!fs_1.default.existsSync(path_1.default.join(os_1.default.tmpdir(), "genv"))) {
        fs_1.default.mkdir(path_1.default.join(os_1.default.tmpdir(), "genv"), (err) => {
            console.log(err);
        });
    }
    if (!fs_1.default.existsSync(path_1.default.join(os_1.default.tmpdir(), "genv", `${project}.json`))) {
        fs_1.default.writeFileSync(path_1.default.join(os_1.default.tmpdir(), "genv", `${project}.json`), "{}", {
            encoding: "utf8",
        });
    }
    process.stdout.write(`created ${project}`);
    process.exit(0);
};
exports.handler = handler;
