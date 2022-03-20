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
exports.run = void 0;
const child_process_1 = require("child_process");
const chalk_1 = __importDefault(require("chalk"));
const path_1 = require("./path");
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const run = (command, cwd = path_1.enterPathDir) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const [cmd, ...args] = command.split(' ');
        console.log(`run: ${chalk_1.default.green(`${cmd} ${args.join(' ')}`)}`);
        const app = (0, child_process_1.spawn)(cmd, args, {
            cwd,
            stdio: 'inherit',
            shell: process.platform === 'win32',
        });
        const onProcessExit = () => app.kill('SIGHUP');
        app.on('close', (code) => {
            process.removeListener('exit', onProcessExit);
            if (code === 0)
                resolve();
            else
                reject(new Error(`Command failed. \n Command: ${command} \n Code: ${code}`));
        });
        process.on('exit', onProcessExit);
    });
});
exports.run = run;
