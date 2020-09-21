"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFileTypeSupported = void 0;
const path_1 = require("path");
exports.isFileTypeSupported = (file) => {
    const SUPPORTED_FILE_TYPES = ['.js', '.ts', '.txt', '.json'];
    const extension = path_1.extname(file);
    return SUPPORTED_FILE_TYPES.includes(extension);
};
