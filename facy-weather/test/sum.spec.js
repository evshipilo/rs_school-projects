
const sum = (num1, num2) => num1 + num2

test('Sum(1,2)', () => {
  const result = sum(1, 2)
  expect(result).toBe(3)
})
