# wmfnext-host

Host application to showcase [wmfnext-shell](https://github.com/patricklafrance/wmfnext-shell).

A [live example](https://wmfnext-host.netlify.app) of this application is hosted on Netlify.

- [Installation](#installation)
- [Start developing](#start-developing)
- [Publish the application](#publish-the-application)
- [Release the packages](#release-the-packages)
- [Available modules](#available-modules)
- [Other commands](#other-commands)

## Installation

This project use Yarn workspace. Therefore, you must install Yarn:

```
choco install yarn
``` 

For more options to install Yarn, view https://yarnpkg.com/lang/en/docs/install/#windows-stable.

To install the project, open a terminal at the root of the workspace and execute the following command:

```bash
yarn install-dev
```

> To ease local development symlinks to shell packages are automatically created at installation.

## Start developing

[Open a terminal in VSCode](https://code.visualstudio.com/docs/editor/integrated-terminal#_managing-multiple-terminals) and execute the following command at the root of the workspace:

```bash
yarn dev
```

## Static module

To develop the static module in isolation, [Open a terminal in VSCode](https://code.visualstudio.com/docs/editor/integrated-terminal#_managing-multiple-terminals) and execute the following commands at the root of the workspace:

```bash
cd packages/static-module-1
```

```bash
yarn dev-local
```

## Publish the application

Push a commit and the application will be automatically deployed on Netlify.

## Release the packages

Releasing the packages includes several steps:

1. Compile the packages code for production
2. Identifies packages that have been updated since the previous release (Read the [Lerna](#lerna) section.)
3. Bump the version of the identified packages
4. Modifies package metadata to reflect new release
5. Publish the packages to npm
6. Push those changes to Git with a tag
7. Create a new Github release associated to the tag created previously

Fortunately, this is all automated with a few commands!

Before you release, make sure you are in the `master` branch, have **write access** to every selected npm packages and that you are [logged in to npm](https://docs.npmjs.com/cli/v9/commands/npm-login).

To release, open a terminal at the root of the workspace and execute the following commands:

```bash
yarn new-version
yarn release
yarn push-release <VERSION> (e.g. yarn push-release 22.0.2)
```

Ex:

```bash
yarn new-version
yarn release
yarn push-release 19.0.1
```

After you released the packages, create a [Github release](https://github.com/gsoft-inc/sg-orbit/releases) for the Git annotated tag [@sharegate/orbit-ui package version] created earlier by the `push-release` command and list all the changes that has been published.

Don't forget to **publish** the release.

## Available modules

- The static module "static-1" is automatically deployed with the host application.
- The remote module "remote-1" is available in the [wmfnext-remote-1 repository](https://github.com/patricklafrance/wmfnext-remote-1).

## Other commands

### build

```bash
yarn build
```

### clean

```bash
yarn clean
```

### link-pkg

```bash
yarn link-pkg
```

### reset

```bash
yarn reset
```
