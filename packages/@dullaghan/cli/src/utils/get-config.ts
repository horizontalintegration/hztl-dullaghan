// Global
import { exit } from 'process';
import { resolve } from 'path';
import * as fs from 'fs';
import { getAbsoluteFilePath } from './get-absolute-file-path.js';

export const getConfig = async (configPath = ''): Promise<DullaghanConfig> => {
  const configFile = resolve(configPath, 'dullaghan.config.mjs');

  if (!fs.existsSync(configFile)) {
    // TODO: Create a config file
    exit(1);
  }

  const data: { config: DullaghanConfig } = await import(getAbsoluteFilePath(configFile));
  return data.config;
};
