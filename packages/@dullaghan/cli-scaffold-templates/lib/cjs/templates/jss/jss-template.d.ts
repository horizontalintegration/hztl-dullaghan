import { DullaghanCli } from '@dullaghan/cli-shared-utils';
export declare type JSSOpt = 'hasGetStaticProps' | 'hasNextDynamic' | 'hasPlaceholder';
export interface JSSTemplateArgs extends DullaghanCli.Scaffold.TemplateArgs {
    jssOpts?: JSSOpt[];
}
