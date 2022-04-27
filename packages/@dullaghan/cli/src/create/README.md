# create

Creates our starter JSS template. This template can be instantiated either standalone or as part of a larger repository that contains the related Sitecore code.

## Usage

```
dullaghan create <directory-name>
```

All you'll need to get started is the Sitecore app name. If this hasn't been created yet, you can input anything and change it in the `package.json` later, but you'll need it to connect to sitecore.

## Local testing

At the root of the hztl-dullaghan repository is a gitignored directory named **test**. It is meant to be used to test this and other CLI methods.

From the root of the CLI directory you can run `npm run test` and it will build, install and run the create command for this hidden directory.
