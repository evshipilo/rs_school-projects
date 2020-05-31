async function getCurrentPositionFromName(city) {
  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=32701a01f2f8492cbefb817597782a12`
    const res = await fetch(url)
    const data = await res.json()
    if (data.results[0].geometry.lat && data.results[0].geometry.lng) {
      return data.results[0].geometry.lat
    }
    return 'location not found'
  } catch (e) {
    return e
  }
}

test('the data ', async () => {
  expect.assertions(1)
  const data = await getCurrentPositionFromName('London')
  expect(data).toBeDefined()
})


test('the data ', async () => {
  expect.assertions(1)
  const data = await getCurrentPositionFromName('')
  expect(typeof +data).toBe('number')
})

