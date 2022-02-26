"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const toEnv_1 = require("../utils/toEnv");
exports.command = "read <project>";
exports.desc = "read <project>";
const builder = (yargs) => yargs
    .options({})
    .positional("project", { type: "string", demandOption: true });
exports.builder = builder;
const handler = (argv) => {
    const { project } = argv;
    if (fs_1.default.existsSync(path_1.default.join(os_1.default.tmpdir(), "genv", `${project}.json`))) {
        const json = fs_1.default.readFileSync(path_1.default.join(os_1.default.tmpdir(), "genv", `${project}.json`), {
            encoding: "utf8",
        });
        console.log((0, toEnv_1.toEnv)(json));
    }
    process.exit(0);
};
exports.handler = handler;
