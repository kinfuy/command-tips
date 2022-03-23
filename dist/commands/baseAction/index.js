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
exports.baseAction = void 0;
const list_1 = require("./list");
const version_1 = require("./version");
const baseAction = (cmd) => __awaiter(void 0, void 0, void 0, function* () {
    if (cmd.version)
        yield (0, version_1.version)();
    if (cmd.list)
        yield (0, list_1.list)();
});
exports.baseAction = baseAction;
