import inquirer from 'inquirer';
export declare namespace DullaghanCli {
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
        type TemplateDictionary = Record<`[name].${string}`, Template<any>>;
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
        }
        type Template<T extends TemplateArgs> = (args: T) => string;
        type ImportCategories = 'global' | 'test' | 'lib' | 'components' | 'local';
    }
    /**
     * Commit hooks
     */
    namespace CommitHooks {
        type Template = (name: string) => string;
    }
}
export interface DullaghanConfig {
    projectType: 'JSS' | 'React';
    scaffold?: {
        scaffoldOpts?: inquirer.QuestionCollection<any>;
        subdirectories: DullaghanCli.Scaffold.Subdirectory[];
        templates?: DullaghanCli.Scaffold.TemplateDictionary;
    };
}
