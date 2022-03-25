"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileShells = void 0;
const promises_1 = require("fs/promises");
/**
 * 获取文件内的shell
 * @param path
 * @returns
 */
const getFileShells = async (path) => {
    const fileBuffer = await (0, promises_1.readFile)(path, 'utf-8');
    const shells = fileBuffer ? JSON.parse(fileBuffer.toString()) : null;
    return shells;
};
exports.getFileShells = getFileShells;
