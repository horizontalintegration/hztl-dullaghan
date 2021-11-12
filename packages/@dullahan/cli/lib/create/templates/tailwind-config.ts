const tailwindConfig = (): string => {
  return `module.exports = {
  purge: {
    content: [
      './src/Layout.tsx',
      './src/NotFound.tsx',
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/lib/**/*.{js,ts,jsx,tsx}',
      // Ensure anything we're adding to Storybook's preview is included.
      './.storybook/preview.js',
    ],
    safelist,
  },
  theme: {},
  extend: {},
  variants: [],
  plugins: [require('@tailwindcss/aspect-ratio')],
}`;
};
