import { isAbsolute } from 'path';
import { pathToFileURL } from 'url';
export const getAbsoluteFilePath = (path) => isAbsolute(path) ? pathToFileURL(path).toString() : path;
