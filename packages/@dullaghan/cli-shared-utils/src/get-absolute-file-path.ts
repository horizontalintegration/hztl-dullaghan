import { isAbsolute } from 'path';
import { pathToFileURL } from 'url';

/**
 * Fix for dynamic imports on Windows
 *
 * @param path {string} The output of path.resolve
 * @returns The absolute path
 */

export const getAbsoluteFilePath = (path: string): string =>
  isAbsolute(path) ? pathToFileURL(path).toString() : path;
