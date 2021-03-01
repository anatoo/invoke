const path = require('path');
const {inspect} = require('util');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const cwd = process.cwd();

export function invoke(target: string, name: string) {
  const requirePath = target.substr(0, 1) === '.' ? path.join(cwd, target) : target;
  const module = require(requirePath);

  if (!(name in module)) {
    throw Error(
      `${inspect(target)} module does not export ${inspect(name)}. ` +
      `Make sure that the path and export name are correct.`
    );
  }
  return module[name]();
}

export function cli() {
  for (const pattern of argv._) {
    const matched = pattern.match('(.+)#(.+)');
    if (matched) {
      const [, target, name] = matched;
      invoke(target, name);
    } else {
      const requirePath = pattern.substr(0, 1) === '.' ? path.join(cwd, pattern) : pattern;
      require(requirePath);
    }
  }
}

