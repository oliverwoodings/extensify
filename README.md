# extensify [![Build Status](https://travis-ci.org/oliverwoodings/extensify.svg?branch=master)](https://travis-ci.org/oliverwoodings/extensify)

Extensify is a [browserify](https://github.com/substack/node-browserify) transform that allows you to require non-standard files (such as `.jsx`) without specifying the file extension. It is built using the [browserify-transform-tools](https://github.com/benbria/browserify-transform-tools).

* Clean up your require calls!
* Supports all file extensions
* Keep the `.jsx` extension on your files so IDEs use correct syntax highlighting and linting
* Works with directories - require a directory and it will automatically convert it


## Purpose

When developing with React and Browserify, you ideally want the following to be possible:

* Require JavaScript files like normal (without having to specify a file extension)
* Have your IDE correctly identify the file as JSX so it lints and does syntax checking correctly
* Keep your code explicit; if a file has JSX in it, you want it to have the `.jsx` extension

Sadly, you cannot have all these three things:

* If you want to require a non-standard file extension such as a `.jsx` file, you need to include the file extension or browserify won't know what to do with it
* If you don't have the file extension as `.jsx`, it is likely that your IDE won't correctly identify the source as JSX and will highlight everything as an error
* If you name your JSX file `.js` your code becomes less explicit

Extensify fixes this. It allows you to require non-standard files without the extension by rewriting the require calls before browserify bundles your project together, making it possible to do this:
```js
var HomeComponent = require("./components/home");
```
instead of this:
```js
var HomeComponent = require("./components/home.jsx");
```


## Installation

`npm install --save-dev extensify`


## Usage

Usage is identical to any other `browserify-transform-tools` transforms. If you are using modules such as pkgify, aliasify or remapify make sure extensify runs after them in the transform process.

#### package.json
Directly in package.json:

```
{
  "extensify": {
    "extensions": ["jsx"]
  }
}
```

or using referencing a separate JS file in package.json:

```
{
  "extensify": "./pkgifyConfig.js"
}
```

#### Browserify API

```js
var extensify = require("extensify");

b.transform(extensify, {
  extensions: ["jsx"]
});
```


## Contributing

#### Setup

```make bootstrap```

#### Running tests

```make test```

#### Commit messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally
* Consider starting the commit message with an applicable emoji:
    * :lipstick: `:lipstick:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :non-potable_water: `:non-potable_water:` when plugging memory leaks
    * :memo: `:memo:` when writing docs
    * :penguin: `:penguin:` when fixing something on Linux
    * :apple: `:apple:` when fixing something on Mac OS
    * :checkered_flag: `:checkered_flag:` when fixing something on Windows
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies

(From [atom](https://atom.io/docs/latest/contributing#git-commit-messages))