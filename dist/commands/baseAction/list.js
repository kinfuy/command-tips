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
exports.list = void 0;
const log_1 = require("../../utils/log");
const getFile_1 = require("../../utils/getFile");
const list = () => __awaiter(void 0, void 0, void 0, function* () {
    const shells = yield (0, getFile_1.getFileName)('json');
    if (shells.length > 0) {
        log_1.log.success('ShellCommandToolTips支持命令库如下:');
        shells.forEach((x) => log_1.log.info(x));
    }
    else {
        log_1.log.success('ShellCommandToolTips暂未添加任何命令库！');
    }
});
exports.list = list;
