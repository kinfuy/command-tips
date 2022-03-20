"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterPathDir = exports.outPathDir = void 0;
const path_1 = require("path");
exports.outPathDir = (0, path_1.resolve)(__dirname, '../../dist');
exports.enterPathDir = (0, path_1.resolve)(__dirname, '../../package');
