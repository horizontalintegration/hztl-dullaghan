export const reactComponent = ({ name }) => {
    return `export type ${name}Props = {

}

const ${name} = ({}: ${name}Props): JSX.Element => {
  return (
    <div>${name}</div>
  );
}

export default ${name}`;
};
