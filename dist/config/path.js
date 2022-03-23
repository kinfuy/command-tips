"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.libsoutputPath = exports.libsEnterPath = exports.enterPath = exports.outputPath = exports.rootPath = void 0;
const path_1 = require("path");
exports.rootPath = (0, path_1.resolve)(__dirname, '..', '..');
exports.outputPath = (0, path_1.resolve)(exports.rootPath, 'dist');
exports.enterPath = (0, path_1.resolve)(exports.rootPath, 'package');
exports.libsEnterPath = (0, path_1.resolve)(exports.enterPath, 'libs');
exports.libsoutputPath = (0, path_1.resolve)(exports.outputPath, 'libs');
