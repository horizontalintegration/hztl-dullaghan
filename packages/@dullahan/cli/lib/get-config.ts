// Global
import fs from 'fs';
import path from 'path';
// Interfaces
import type { DullahanCli } from '../dullahan-cli';
// Local
import defaultConfig from '../../default.dullahan.config';

const getConfig = (configPath = ''): DullahanCli.Config => {
  const configFile = path.resolve(configPath, 'dullahan.config.js');
  const customConfig = fs.existsSync(configFile) ? require(configFile) : {};

  // TODO: Smarter merging
  return { ...defaultConfig, ...customConfig };
};

export default getConfig;
