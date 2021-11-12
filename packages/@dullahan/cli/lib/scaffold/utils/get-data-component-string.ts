import { DullahanCli } from '../../../dullahan-cli';

const getDataComponentString = (
  name: string,
  subdirectory: DullahanCli.Scaffold.Subdirectory
): string => `${subdirectory.dataComponent}${name.toLowerCase()}`;

export default getDataComponentString;
