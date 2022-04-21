import { DullaghanCli } from '@dullaghan/cli-shared-utils';

export type JSSOpt = 'hasGetStaticProps' | 'hasNextDynamic' | 'hasPlaceholder';

export interface JSSTemplateArgs extends DullaghanCli.Scaffold.TemplateArgs {
  jssOpts?: JSSOpt[];
}
