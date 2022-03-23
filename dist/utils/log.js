"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const chalk_1 = require("chalk");
const success = (msg) => console.log((0, chalk_1.green)(msg));
const error = (msg) => console.log((0, chalk_1.red)(msg));
const warning = (msg) => console.log((0, chalk_1.yellowBright)(msg));
const info = (msg) => console.log((0, chalk_1.blueBright)(msg));
exports.log = {
    success,
    error,
    warning,
    info,
};
