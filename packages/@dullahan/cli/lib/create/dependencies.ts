import type { DullahanCli } from '../../dullahan-cli';

type Dependencies = {
  dev?: string[];
  devDep?: string[];
};

const moduleDependencies: Record<DullahanCli.Create.Module, Dependencies> = {
  tailwind: {
    devDep: [
      'tailwindcss@latest',
      'postcss@latest',
      'autoprefixer@latest',
      '@tailwindcss/aspect-ratio',
    ],
  },
  storybook: {},
};

const getDependencies = (modules: DullahanCli.Create.Module[]): Dependencies => {
  const deps = {
    dev: [] as string[],
    devDep: [] as string[],
  };

  modules.forEach((module) => {
    const moduleDeps = moduleDependencies[module];
    if (!!moduleDeps.dev) {
      deps.dev = deps.dev.concat(moduleDeps.dev);
    }
    if (!!moduleDeps.devDep) {
      deps.devDep = deps.devDep.concat(moduleDeps.devDep);
    }
  });

  return deps;
};

export default getDependencies;
