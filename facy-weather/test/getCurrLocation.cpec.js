// async function getCurrentLocation() {
//   try {
//     const { coords } = await this.getCurrentPosition()
//     return coords.latitude
//   } catch (e) {
//     console.log('cant get geolocation', e)
//   }
// }
//
test('the data ', async () => {
  expect.assertions(1)
  const data = await getCurrentLocation()
  expect(data).toBeDefined()
})

test('the data ', async () => {
  expect.assertions(1)
  const data = await getCurrentLocation()
  expect(typeof data).toBe('number')
})
