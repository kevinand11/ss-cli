"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeContentToFile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
exports.writeContentToFile = (path, content) => {
    const directory = path_1.dirname(path);
    if (!fs_1.existsSync(directory))
        fs_1.mkdirSync(directory, { recursive: true });
    fs_1.writeFileSync(path, content, 'utf8');
};
