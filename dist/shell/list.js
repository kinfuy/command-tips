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
exports.list = void 0;
const promises_1 = require("fs/promises");
const log_1 = require("../libs/log");
const path_1 = require("path");
const inquirer_1 = __importDefault(require("inquirer"));
const list = () => __awaiter(void 0, void 0, void 0, function* () {
    const shells = yield (0, promises_1.readdir)((0, path_1.resolve)(__dirname, '../template'));
    yield inquirer_1.default
        .prompt([
        {
            type: 'list',
            name: 'namespace',
            message: 'tips list！',
            choices: shells.map((x) => {
                return {
                    name: x,
                    value: x,
                };
            }),
        },
    ])
        .then((answers) => {
        // 打印互用输入结果
        console.log(answers);
        log_1.log.success(answers.namespace);
    });
});
exports.list = list;
