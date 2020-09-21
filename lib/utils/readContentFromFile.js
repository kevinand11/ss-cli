"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readContentFromFile = void 0;
const fs_1 = require("fs");
exports.readContentFromFile = (path) => {
    return fs_1.readFileSync(path, 'utf8');
};
