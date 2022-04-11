import { isAbsolute } from 'path';
import { pathToFileURL } from 'url';

export const getAbsoluteFilePath = (path: string): string =>
  isAbsolute(path) ? pathToFileURL(path).toString() : path;
