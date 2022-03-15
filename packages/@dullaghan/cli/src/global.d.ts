declare namespace DullaghanCli {
  /**
   * Create
   */
  namespace Create {
    interface PackageJson {
      name: string;
      config: {
        appName: string;
      };
      scripts: Record<string, string>;
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    }

    type PackageTuple = [string, string];

    type OptionalModule = 'storybook';

    interface ModulePackageConfig {
      scripts?: PackageTuple[];
      dependencies?: PackageTuple[];
      devDependencies?: PackageTuple[];
    }
  }

  /**
   * Scaffold
   */
  namespace Scaffold {
    interface CliArgs {
      config?: string;
    }

    type CliUserOptions = 'hasPlaceholder' | 'hasGetStaticProps' | 'hasNextDynamic';

    type TemplateDictionary = Record<`[name].${string}`, Template>;

    interface Subdirectory {
      path: string;
      name: string;
      dataComponent: string;
      storybook: string;
      templates?: TemplateDictionary;
    }

    interface TemplateArgs {
      name: string;
      subdirectory: Subdirectory;
      hasGetStaticProps: boolean;
      hasNextDynamic: boolean;
      hasPlaceholder: boolean;
    }

    type Template = (args: TemplateArgs) => string;

    type ImportCategories = 'global' | 'test' | 'lib' | 'components' | 'local';
  }
}

/**
 * Config
 */

interface DullaghanConfig {
  scaffold?: {
    subdirectories: DullaghanCli.Scaffold.Subdirectory[];
    templates?: DullaghanCli.Scaffold.TemplateDictionary;
  };
}
