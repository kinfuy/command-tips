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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShells = exports.runShell = void 0;
const shelljs_1 = __importDefault(require("shelljs")); // 非特殊配置同步执行shell
const getFile_1 = require("./getFile");
const getLibsShell_1 = require("./getLibsShell");
const runShell = (shell) => {
    return new Promise((resolve, reject) => {
        try {
            if (shelljs_1.default.exec(shell).code !== 0) {
                reject('shell意外退出！');
            }
            resolve(`执行成功:${shell}`);
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.runShell = runShell;
const getShells = () => __awaiter(void 0, void 0, void 0, function* () {
    let shells = [];
    const shellFiles = yield (0, getFile_1.getFiles)('json');
    for (let i = 0; i < shellFiles.length; i++) {
        const shell = yield (0, getLibsShell_1.getFileShells)(shellFiles[i]);
        shell && shells.push(...shell.shell);
    }
    return shells;
});
exports.getShells = getShells;
