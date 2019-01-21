import { classNames, joinString } from './lib.js';

test('classNames', () => {
  expect(classNames('btn', 'btn--default')).toBe('btn btn--default');
  expect(
    classNames('btn', true && 'btn--default', false && 'btn--raised', null)
  ).toBe('btn btn--default');
  expect(classNames(['btn', null, 'btn--default'])).toBe('btn btn--default');
  expect(classNames('btn', true, [null], ['btn--default'])).toBe(
    'btn btn--default'
  );
});

test('joinString', () => {
  expect(joinString(', ', 'You', 'Me')).toBe('You, Me');
});
