/**
 * Fix for dynamic imports on Windows
 *
 * @param path {string} The output of path.resolve
 * @returns The absolute path
 */
export declare const getAbsoluteFilePath: (path: string) => string;
