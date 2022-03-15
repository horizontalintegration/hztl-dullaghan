// Global
import * as fs from 'fs';
import * as path from 'path';
// Local
import { defaultConfig } from './default-config.js';

export const getConfig = (configPath = ''): DullaghanConfig => {
  const configFile = path.resolve(configPath, 'dullaghan.config.js');
  const customConfig = fs.existsSync(configFile) ? require(configFile) : {};

  // TODO: Smarter merging
  return { ...defaultConfig, ...customConfig };
};