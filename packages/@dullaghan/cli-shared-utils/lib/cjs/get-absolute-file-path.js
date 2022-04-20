"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbsoluteFilePath = void 0;
const path_1 = require("path");
const url_1 = require("url");
/**
 * Fix for dynamic imports on Windows
 *
 * @param path {string} The output of path.resolve
 * @returns The absolute path
 */
const getAbsoluteFilePath = (path) => (0, path_1.isAbsolute)(path) ? (0, url_1.pathToFileURL)(path).toString() : path;
exports.getAbsoluteFilePath = getAbsoluteFilePath;
