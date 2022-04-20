"use strict";
// Shortcut for questions that use the `checkbox` type to transform the option into a boolean
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasChoice = void 0;
const hasChoice = (opts, choiceArray) => {
    if (!choiceArray || !Array.isArray(choiceArray)) {
        return opts.reduce((prev, curr) => ({ ...prev, [curr]: false }), {});
    }
    return opts.reduce((prev, curr) => ({ ...prev, [curr]: choiceArray.includes(curr) }), {});
};
exports.hasChoice = hasChoice;
