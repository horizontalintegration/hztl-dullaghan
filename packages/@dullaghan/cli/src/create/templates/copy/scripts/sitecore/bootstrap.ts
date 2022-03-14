// Global
import fs from 'fs';
// Local
import { generateConfig } from './generate-config';

// As part of the startup process, we'll create a "localtunnel" and store the url in "./.tunnel"
// Before we start, we'll want to delete the previous file if it exists
if (fs.existsSync('./.tunnel')) {
  fs.unlinkSync('./.tunnel');
}

/*
  CONFIG GENERATION
  Generates the /temp/config.js file which contains runtime configuration
  that the app can import and use.
*/
generateConfig();

/*
  COMPONENT FACTORY GENERATION
*/
import './generate-component-factory';
