"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataComponentString = void 0;
const getDataComponentString = (name, subdirectory) => `${subdirectory.dataComponent}${name.toLowerCase()}`;
exports.getDataComponentString = getDataComponentString;
