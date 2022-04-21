# `@dullaghan/prettier-config`

Prettier config for headless projects

## Usage

Install this package as a dev dependency

```
npm i -D @dullaghan/prettier-config
```

Create a `.prettierrc` file with the following

```json
"@dullaghan/prettier-config"
```

From there you should configure prettier to run automatically at some point during the development process. We reccomend adding this as a pre-commit hook using the `@dullaghan/cli`'s `git-hooks` command.
