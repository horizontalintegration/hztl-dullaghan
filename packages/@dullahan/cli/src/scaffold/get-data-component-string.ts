export const getDataComponentString = (
  name: string,
  subdirectory: DullahanCli.Scaffold.Subdirectory
): string => `${subdirectory.dataComponent}${name.toLowerCase()}`;
