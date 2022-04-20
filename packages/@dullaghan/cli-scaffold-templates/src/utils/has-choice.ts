// Shortcut for questions that use the `checkbox` type to transform the option into a boolean

export const hasChoice = <T extends string>(opts: T[], choiceArray?: T[]): Record<T, boolean> => {
  if (!choiceArray || !Array.isArray(choiceArray)) {
    return opts.reduce((prev, curr) => ({ ...prev, [curr]: false }), {}) as Record<T, boolean>;
  }

  return opts.reduce(
    (prev, curr) => ({ ...prev, [curr]: choiceArray.includes(curr) }),
    {}
  ) as Record<T, boolean>;
};
