# Contributing

Contributions are always welcome, no matter how large or small!

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project. Before contributing, please read the [code of conduct](./CODE_OF_CONDUCT.md).

## Development workflow

This project is a monorepo managed using [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces). It contains the following packages:

- The library package in the root directory.
- An example app in the `example/` directory.

To get started with the project, run `npm install` in the root directory to install the required dependencies for each package:

```sh
npm install
```

The [example app](/example/) demonstrates usage of the library. You need to run it to test any changes you make.

It is configured to use the local version of the library, so any changes you make to the library's source code will be reflected in the example app. Changes to the library's JavaScript code will be reflected in the example app without a rebuild, but native code changes will require a rebuild of the example app.

If you want to use Android Studio or XCode to edit the native code, you can open the `example/android` or `example/ios` directories respectively in those editors. To edit the Objective-C or Swift files, open `example/ios/LiveMarkdownExample.xcworkspace` in XCode and find the source files at `Pods > Development Pods > react-native-live-markdown`.

To edit the Java or Kotlin files, open `example/android` in Android studio and find the source files at `react-native-live-markdown` under `Android`.

You can use various commands from the root directory to work with the project.

To start the packager:

```sh
npm run example start
```

To run the example app on Android:

```sh
npm run example android
```

To run the example app on iOS:

```sh
npm run example ios
```

By default, the example is configured to build with the old architecture. To run the example with the new architecture, you can do the following:

1. For Android, run:

   ```sh
   ORG_GRADLE_PROJECT_newArchEnabled=true npm run example android
   ```

2. For iOS, run:

   ```sh
   cd example/ios && bundler install && RCT_NEW_ARCH_ENABLED=1 bundler exec pod install
   npm run example ios
   ```

If you are building for a different architecture than your previous build, make sure to remove the build folders first. You can run the following command to cleanup all build folders:

```sh
npm run clean
```

To confirm that the app is running with the new architecture, you can check the Metro logs for a message like this:

```sh
Running "LiveMarkdownExample" with {"fabric":true,"initialProps":{"concurrentRoot":true},"rootTag":1}
```

Note the `"fabric":true` and `"concurrentRoot":true` properties.

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
npm run typecheck
npm run lint
```

To fix formatting errors, run the following:

```sh
npm run lint -- --fix
```

Remember to add tests for your change if possible. Run the unit tests by:

```sh
npm run test
```

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `refactor`: code refactor, e.g. migrate from class components to hooks.
- `docs`: changes into documentation, e.g. add usage example for the module..
- `test`: adding or updating tests, e.g. add integration tests using detox.
- `chore`: tooling changes, e.g. change CI config.

Our pre-commit hooks verify that your commit message matches this format when committing.

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

### Publishing to npm

We use [release-it](https://github.com/release-it/release-it) to make it easier to publish new versions. It handles common tasks like bumping version based on semver, creating tags and releases etc.

To publish new versions, run the following:

```sh
npm run release
```

### Scripts

The `package.json` file contains various scripts for common tasks:

- `npm install`: setup project by installing dependencies and pods - run with `POD_INSTALL=0` to skip installing pods.
- `npm run typecheck`: type-check files with TypeScript.
- `npm run lint`: lint files with ESLint.
- `npm run test`: run unit tests with Jest.
- `npm run example start`: start the Metro server for the example app.
- `npm run example android`: run the example app on Android.
- `npm run example ios`: run the example app on iOS.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.

### Testing with Expensify/App (or other projects)

It's possible to locally develop this repo such with live-reload in another React Native project. These instructions are for Expensify/App, but they can be adapted to other repos as well.

1. Clone this repo
2. Run `npm install`
3. Run `npm run build:watch`
4. In Expensify/App, run `npm install`.
   - _Note:_ There is a patch for the `link` dev dependency in this repo. If you want these steps to work reliably, you'll likely need to copy that patch over.
5. In Expensify/App, run `npx link publish --watch ~/react-native-live-markdown --litmus .build_complete`
6. In E/App, run the app with `npm run web`/`npm run ios`/etc...

The end result should be that you can make a change directly in this repo, and your changes will live-reload in E/App.
