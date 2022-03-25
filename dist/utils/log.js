"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const chalk_1 = __importDefault(require("chalk"));
const { green, red, yellowBright, blueBright } = chalk_1.default;
const success = (msg) => console.log(green(msg));
const error = (msg) => console.log(red(msg));
const warning = (msg) => console.log(yellowBright(msg));
const info = (msg) => console.log(blueBright(msg));
exports.log = {
    success,
    error,
    warning,
    info,
};
