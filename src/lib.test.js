import { joinString, classNames } from './lib';

test('joinString', () => {
  expect(typeof joinString).toBe('function');

  expect(
    joinString(', ', 'Malcolm', 'Jean', false, {}, undefined, 'Najib', null)
  ).toBe('Malcolm, Jean, Najib');

  expect(
    joinString(', ', ['Malcolm', 'Jean', false, {}, undefined, 'Najib', null])
  ).toBe('Malcolm, Jean, Najib');

  expect(
    joinString(', ', 'Malcolm', ['Jean', false, {}, 'LOL'], null, 'Happy')
  ).toBe('Malcolm, Jean, LOL, Happy');
});

test('classNames', () => {
  expect(classNames('btn', 'btn--default')).toBe('btn btn--default');
  expect(
    classNames('btn', true && 'btn--default', false && 'btn--raised', null)
  ).toBe('btn btn--default');
  expect(classNames(['btn', null, 'btn--default'])).toBe('btn btn--default');
});
