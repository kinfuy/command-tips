"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = void 0;
const util_1 = require("util");
const package_json_1 = __importDefault(require("../../package.json"));
const log_1 = require("../../utils/log");
const figlet = (0, util_1.promisify)(require('figlet'));
const version = async () => {
    const info = await figlet(`${package_json_1.default.name}`);
    log_1.log.success(`${info}  ${package_json_1.default.version}`);
};
exports.version = version;
