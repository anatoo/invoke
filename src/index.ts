const path = require('path');
const {inspect} = require('util');
const {program} = require('commander');
const {version} = require('../package.json');

export function invoke(target: string, name?: string, args: any[] = []) {
  const cwd = process.cwd();
  const requirePath = target.substr(0, 1) === '.' ? path.join(cwd, target) : target;
  const module = require(requirePath);

  if (typeof name === 'string') {
    if (!(name in module)) {
      throw Error(
        `${inspect(target)} module does not export ${inspect(name)}. ` +
        `Make sure that the path and export name is correct.`
      );
    }

    return module[name](...args);
  } else {
    const fn = module.__esModule ? module['default'] : module;
    if (typeof fn !== 'function') {
      throw Error(
        `The default exported value is not a function.`
      );
    }
    return fn(...args);
  }
}

const helpText = `
Example:
  $ invoke "./path/to/module.js"                  Invoke default exported function.
  $ invoke "./path/to/module.js" <export name>    Invoke named exported function.
`;

export function cli() {
  program
    .name('invoke').usage('<module> [name]')
    .version(version)
    .arguments('[module] [name]')
    .option('-l, --list', 'List exported function names from the module')
    .description('Execute the function exported from the node.js module.', {
      module: 'Path to module. Example: "./foobar.js"',
      name: 'Exported function name. Not required for default exported function.'
    })
    .action((module?: string, name?: string) => {
      if (typeof module !== 'string') {
        program.help({error: true});
        return;
      }
      invoke(module, name);
    })
    .addHelpText('after', helpText);
  program.parse(process.argv);

  const options = program.opts();
}

