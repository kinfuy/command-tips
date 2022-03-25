"use strict";
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
const getShells = async () => {
    let shells = [];
    const shellFiles = await (0, getFile_1.getFiles)('json');
    for (let i = 0; i < shellFiles.length; i++) {
        const shell = await (0, getLibsShell_1.getFileShells)(shellFiles[i]);
        shell && shells.push(...shell.shell);
    }
    return shells;
};
exports.getShells = getShells;
