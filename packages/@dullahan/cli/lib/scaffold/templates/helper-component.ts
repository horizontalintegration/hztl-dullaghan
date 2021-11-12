// Interfaces
import type { DullahanCli } from '../../../dullahan-cli';

const helperComponent = ({ name }: DullahanCli.Scaffold.TemplateArgs): string => {
  return `export type ${name}Props = {}

const ${name} = ({}: ${name}Props): JSX.Element => {
  return (
    <div>${name}</div>
  );
}

export default ${name}`;
};

export default helperComponent;
