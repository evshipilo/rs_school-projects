/* eslint-disable no-var */
import { deleteThe } from '../src/app/js/module/sum';

test('deleteThe(the house)', () => {
  const result = deleteThe('the house');
  expect(result).toBe('house');
});

test('deleteThe(the    house)', () => {
  const result = deleteThe('the   house');
  expect(result).toBe('house');
});
