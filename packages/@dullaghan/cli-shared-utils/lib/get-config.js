// Global
import { exit } from 'process';
import { resolve } from 'path';
import * as fs from 'fs';
// Local
import { getAbsoluteFilePath } from './get-absolute-file-path.js';
export const getConfig = async (configPath = '') => {
    const configFile = resolve(configPath, 'dullaghan.config.mjs');
    if (!fs.existsSync(configFile)) {
        // TODO: Create a config file
        exit(1);
    }
    const data = await import(getAbsoluteFilePath(configFile));
    return data.config;
};
