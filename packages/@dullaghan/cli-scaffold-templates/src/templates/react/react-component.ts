import { DullaghanCli } from '@dullaghan/cli-shared-utils';

export const reactComponent: DullaghanCli.Scaffold.Template<any> = ({
  name,
}) => {
  return `export type ${name}Props = {

}

const ${name} = ({}: ${name}Props) => {
  return (
    <div>${name}</div>
  );
}

export default ${name}`;
};
