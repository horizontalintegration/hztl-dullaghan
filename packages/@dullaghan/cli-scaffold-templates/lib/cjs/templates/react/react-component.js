"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactComponent = void 0;
const reactComponent = ({ name }) => {
    return `export type ${name}Props = {

}

const ${name} = ({}: ${name}Props): JSX.Element => {
  return (
    <div>${name}</div>
  );
}

export default ${name}`;
};
exports.reactComponent = reactComponent;
