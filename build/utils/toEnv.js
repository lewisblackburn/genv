"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEnv = void 0;
// write a function taht converts json to env variables
const toEnv = (json) => {
    const parsed = JSON.parse(json);
    const envs = [];
    Object.keys(parsed).forEach((key) => {
        envs.push(`${key}=${parsed[key]}\n`);
    });
    return envs.join("");
};
exports.toEnv = toEnv;
