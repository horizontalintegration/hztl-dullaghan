declare namespace DullahanCli {
  /**
   * Create
   */
  namespace Create {
    interface PackageJson {
      name: string;
      config: {
        appName: string;
      };
    }
  }

  /**
   * Scaffold
   */
  namespace Scaffold {
    interface CLIArgs {
      config?: string;
    }

    type CLIUserOptions = 'hasPlaceholder' | 'hasGetStaticProps' | 'hasNextDynamic';

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

interface DullahanConfig {
  scaffold?: {
    subdirectories: DullahanCli.Scaffold.Subdirectory[];
    templates?: DullahanCli.Scaffold.TemplateDictionary;
  };
}
