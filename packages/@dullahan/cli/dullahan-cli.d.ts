/**
 * Create
 */
export namespace DullahanCli.Create {
  export type Module = 'tailwind' | 'storybook';

  export type MethodArgs = {
    force?: boolean;
  };
}

/**
 * Scaffold
 */
export namespace DullahanCli.Scaffold {
  export type MethodArgs = {
    config?: string;
  };

  export type Subdirectory = {
    name: string;
    path: string;
    dataComponent?: string;
    storybook?: string;
    templates?: Record<string, TemplateMethod>;
  };

  export type TemplateOpts = 'hasGetStaticProps' | 'hasNextDynamic' | 'hasPlaceholder';

  export type TemplateArgs = {
    name: string;
    subdirectory: Subdirectory;
    hasGetStaticProps: boolean;
    hasNextDynamic: boolean;
    hasPlaceholder: boolean;
  };

  export type TemplateMethod = (args: TemplateArgs) => string;

  export type ImportCategories = 'global' | 'generated' | 'test' | 'lib' | 'components' | 'local';

  export type Config = {
    scaffold: {
      subdirectories: Subdirectory[];
      templates?: Record<string, TemplateMethod>;
    };
  };
}

export namespace DullahanCli {
  export type Config = DullahanCli.Scaffold.Config & {};
}
