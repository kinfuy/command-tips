"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseAction = void 0;
const list_1 = require("./list");
const version_1 = require("./version");
const baseAction = async (cmd) => {
    if (cmd.version)
        await (0, version_1.version)();
    if (cmd.list)
        await (0, list_1.list)();
};
exports.baseAction = baseAction;
