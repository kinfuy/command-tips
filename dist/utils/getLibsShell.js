"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileShells = void 0;
const promises_1 = require("fs/promises");
/**
 * 获取文件内的shell
 * @param path
 * @returns
 */
const getFileShells = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const fileBuffer = yield (0, promises_1.readFile)(path, 'utf-8');
    const shells = fileBuffer ? JSON.parse(fileBuffer.toString()) : null;
    return shells;
});
exports.getFileShells = getFileShells;
