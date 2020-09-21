"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFilesFromType = void 0;
const path_1 = require("path");
const fetchAllFilesInDirectory_1 = require("./utils/fetchAllFilesInDirectory");
const readContentFromFile_1 = require("./utils/readContentFromFile");
const generateContentFromTemplate_1 = require("./utils/generateContentFromTemplate");
const isFileTypeSupported_1 = require("./utils/isFileTypeSupported");
const writeContentToFile_1 = require("./utils/writeContentToFile");
const chalk = require("chalk");
exports.generateFilesFromType = (name, type, category = 'client') => {
    const templatePath = path_1.join(__dirname, '..', 'templates', type);
    const files = fetchAllFilesInDirectory_1.getAllFilesInADirectory(templatePath);
    files.forEach((file) => {
        const fromPath = path_1.join(templatePath, file);
        const fileIsSupported = isFileTypeSupported_1.isFileTypeSupported(fromPath);
        if (fileIsSupported) {
            const template = readContentFromFile_1.readContentFromFile(fromPath);
            const variables = { name };
            const content = generateContentFromTemplate_1.generateContentFromTemplate(template, variables);
            const toPath = path_1.join(name, category, file);
            writeContentToFile_1.writeContentToFile(toPath, content);
        }
        else {
            const extension = path_1.extname(fromPath);
            const message = `${extension} files are not supported. Contact the developer to ask to provide support for such files.`;
            console.log(chalk.red(message));
        }
    });
};
