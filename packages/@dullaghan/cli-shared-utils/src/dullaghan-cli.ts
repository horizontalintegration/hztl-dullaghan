import { QuestionCollection } from 'inquirer';

export namespace DullaghanCli {
  /**
   * Create
   */
  export namespace Create {
    export interface PackageJson {
      name: string;
      config: {
        appName: string;
      };
      scripts: Record<string, string>;
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    }

    export type PackageTuple = [string, string];

    export type OptionalModule = 'storybook';

    export interface ModulePackageConfig {
      scripts?: PackageTuple[];
      dependencies?: PackageTuple[];
      devDependencies?: PackageTuple[];
    }
  }

  /**
   * Scaffold
   */
  export namespace Scaffold {
    export interface CliArgs {
      config?: string;
    }

    export type TemplateDictionary = Record<`[name].${string}`, Template<any>>;

    export interface Subdirectory {
      path: string;
      name: string;
      dataComponent: string;
      storybook: string;
      templates?: TemplateDictionary;
    }

    export interface TemplateArgs {
      name: string;
      subdirectory: Subdirectory;
    }

    export type Template<T extends TemplateArgs> = (args: T) => string;

    export type ImportCategories =
      | 'global'
      | 'test'
      | 'lib'
      | 'components'
      | 'local';
  }

  /**
   * Commit hooks
   */
  export namespace CommitHooks {
    export type Template = (name: string) => string;
  }
}

export interface DullaghanConfig {
  projectType: 'JSS' | 'React';
  scaffold?: {
    scaffoldOpts?: QuestionCollection<any>;
    subdirectories: DullaghanCli.Scaffold.Subdirectory[];
    templates?: DullaghanCli.Scaffold.TemplateDictionary;
  };
}
