"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTask = exports.withTaskName = void 0;
const process_1 = require("./process");
const withTaskName = (name, fn) => Object.assign(fn, { displayName: name });
exports.withTaskName = withTaskName;
const runTask = (name) => (0, exports.withTaskName)(name, () => (0, process_1.run)(`pnpm run build ${name}`));
exports.runTask = runTask;
