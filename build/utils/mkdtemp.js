"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
function default_1() {
    fs_1.default.mkdtemp(path_1.default.join(os_1.default.tmpdir(), "foo-"), (err, folder) => {
        if (err)
            throw err;
        console.log(folder);
    });
}
exports.default = default_1;
