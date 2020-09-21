"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFilesInADirectory = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
exports.getAllFilesInADirectory = (directory, store = { files: [], basePath: '' }) => {
    if (!store.basePath)
        store.basePath = path_1.join(directory);
    const contents = fs_1.readdirSync(directory);
    contents.forEach((content) => {
        const filePath = path_1.join(directory, content);
        const stats = fs_1.statSync(filePath);
        if (stats.isDirectory())
            exports.getAllFilesInADirectory(filePath, store);
        else if (stats.isFile()) {
            const splitOnBasePath = filePath.split(store.basePath);
            const currentFileToAdd = splitOnBasePath[1];
            store.files.push(currentFileToAdd);
        }
    });
    return store.files;
};
