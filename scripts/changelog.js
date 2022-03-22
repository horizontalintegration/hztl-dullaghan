import { execa } from 'execa';
import { exit } from 'process';
import dotenv from 'dotenv';

const changelog = async () => {
  dotenv.config();
  const { stdout } = await execa('npx', ['lerna-changelog']);
  console.log(stdout);
};

changelog().catch((err) => {
  console.error(err);
  exit(1);
});
