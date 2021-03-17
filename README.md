# `@anatoo/invoke`

[![npm version](https://badge.fury.io/js/%40anatoo%2Finvoke.svg)](https://badge.fury.io/js/%40anatoo%2Finvoke)

Call the function exported by the module from the CLI.

## Install

```
$ yarn add @anatoo/invoke
```

## Usage

Call default exported function in "./foo.js":

```
$ yarn invoke "./foo.js"
```

Call "hello" named export function in "./foo.js":

```
$ yarn invoke "./foo.js" hello
```

## License

[MIT License](LICENSE.md)

## Author

Kubota Mitsunori, [@anatoo](https://twitter.com/anatoo)
