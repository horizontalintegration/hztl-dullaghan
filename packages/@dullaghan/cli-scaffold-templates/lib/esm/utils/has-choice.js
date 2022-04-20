// Shortcut for questions that use the `checkbox` type to transform the option into a boolean
export const hasChoice = (opts, choiceArray) => {
    if (!choiceArray || !Array.isArray(choiceArray)) {
        return opts.reduce((prev, curr) => ({ ...prev, [curr]: false }), {});
    }
    return opts.reduce((prev, curr) => ({ ...prev, [curr]: choiceArray.includes(curr) }), {});
};
