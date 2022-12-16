# wmfnext-host

## Installation

This project use Yarn workspace. Therefore, you must install Yarn:

```
choco install yarn
``` 

For more options to install Yarn, view https://yarnpkg.com/lang/en/docs/install/#windows-stable.

To install the project, open a terminal at the root of the workspace and execute the following command:

```bash
yarn install
```

## Start developing

To start developing, [open a terminal in VSCode](https://code.visualstudio.com/docs/editor/integrated-terminal#_managing-multiple-terminals) and execute the following command at the root of the workspace:

```bash
yarn dev
```

To only start the application in development mode, use the following command instead:

```bash
yarn dev-app
```

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

## Publish the application

TBD

## Remotes

TBD
