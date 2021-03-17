import {invoke} from '../index';

test('invoke()', () => {
  process.chdir(__dirname);
  const result = invoke('./hello.ts', 'hello');
  expect(result).toBe('Hello!');

  expect(invoke('./hello.ts')).toBe('Export default function');
});
