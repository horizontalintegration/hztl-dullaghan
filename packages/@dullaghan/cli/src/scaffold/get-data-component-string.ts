export const getDataComponentString = (
  name: string,
  subdirectory: DullaghanCli.Scaffold.Subdirectory
): string => `${subdirectory.dataComponent}${name.toLowerCase()}`;
