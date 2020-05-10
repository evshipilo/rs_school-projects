/* eslint-disable no-var */
import { isRussianLetters } from '../src/app/js/module/sum';

test('isRussianLetters(ДОМ)', () => {
  const result = isRussianLetters('ДОМ');
  expect(result).toBe(true);
});

test('isRussianLetters(House)', () => {
  const result = isRussianLetters('House');
  expect(result).toBe(false);
});
