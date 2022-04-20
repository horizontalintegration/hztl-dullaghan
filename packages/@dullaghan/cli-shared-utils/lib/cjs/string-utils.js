"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kebabCase = void 0;
const kebabCase = (str) => str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
exports.kebabCase = kebabCase;
