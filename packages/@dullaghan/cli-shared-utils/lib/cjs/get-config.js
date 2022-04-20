"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
// Global
const process_1 = require("process");
const path_1 = require("path");
const fs = __importStar(require("fs"));
// Local
const get_absolute_file_path_js_1 = require("./get-absolute-file-path.js");
const getConfig = async (configPath = '') => {
    const configFile = (0, path_1.resolve)(configPath, 'dullaghan.config.mjs');
    if (!fs.existsSync(configFile)) {
        // TODO: Create a config file
        (0, process_1.exit)(1);
    }
    const data = await Promise.resolve().then(() => __importStar(require((0, get_absolute_file_path_js_1.getAbsoluteFilePath)(configFile))));
    return data.config;
};
exports.getConfig = getConfig;
