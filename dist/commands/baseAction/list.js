"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
const log_1 = require("../../utils/log");
const getFile_1 = require("../../utils/getFile");
const list = async () => {
    const shells = await (0, getFile_1.getFileName)('json');
    if (shells.length > 0) {
        log_1.log.success('ShellCommandToolTips支持命令库如下:');
        shells.forEach((x) => log_1.log.info(x));
    }
    else {
        log_1.log.success('ShellCommandToolTips暂未添加任何命令库！');
    }
};
exports.list = list;
