"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runShell = void 0;
const shelljs_1 = __importDefault(require("shelljs")); // 非特殊配置同步执行shell
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
