import { DullaghanCli } from '@dullaghan/cli-shared-utils';

export const getDataComponentString = (
  name: string,
  subdirectory: DullaghanCli.Scaffold.Subdirectory
): string => `${subdirectory.dataComponent}${name.toLowerCase()}`;
