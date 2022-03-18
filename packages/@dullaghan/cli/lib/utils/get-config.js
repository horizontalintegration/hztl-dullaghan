// Global
import * as fs from 'fs';
import * as path from 'path';
// Local
import { defaultConfig } from './default-config.js';
export const getConfig = async (configPath = '') => {
    const configFile = path.resolve(configPath, 'dullaghan.config.mjs');
    const customConfig = fs.existsSync(configFile) ? await import(configFile) : { config: {} };
    // TODO: Smarter merging
    return { ...defaultConfig, ...customConfig.config };
};
