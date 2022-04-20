import { DullaghanCli } from '@dullaghan/cli-shared-utils';
export interface JSSTemplateArgs extends DullaghanCli.Scaffold.TemplateArgs {
    hasGetStaticProps: boolean;
    hasNextDynamic: boolean;
    hasPlaceholder: boolean;
}
