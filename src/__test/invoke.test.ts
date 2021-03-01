import {invoke} from '../index';

process.chdir(__dirname);

test('invoke()', () => {
  const result = invoke('./hello.ts', 'hello');
  expect(result).toBe('Hello!');
});
