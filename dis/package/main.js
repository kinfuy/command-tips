#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const version_1 = require("./shell/version");
commander_1.program.option('-v').action(() => {
    (0, version_1.version)();
});
commander_1.program.parse(process.argv);
