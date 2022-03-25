"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileName = exports.getFiles = void 0;
const fast_glob_1 = __importDefault(require("fast-glob"));
const path_1 = __importDefault(require("path"));
/**
 * 获取文件
 * @param sufix 后缀
 * @param dir 地址：默认libs
 * @returns
 */
const getFiles = async (sufix, dir = 'libs') => {
    const rootPath = await path_1.default.resolve(__dirname, `../${dir}`);
    return (0, fast_glob_1.default)(`*.${sufix}`, { cwd: rootPath, absolute: true });
};
exports.getFiles = getFiles;
const getFileName = async (sufix) => {
    const fileList = await (0, exports.getFiles)(sufix);
    return fileList.map((file) => path_1.default.basename(file).replace(`.${sufix}`, ''));
};
exports.getFileName = getFileName;
