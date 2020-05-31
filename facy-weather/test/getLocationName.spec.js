async function getCurrentLocationName(language, lat, long) {
  const url =
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&language=${language}&roadinfo=0&key=32701a01f2f8492cbefb817597782a12`
  try {
    const res = await fetch(url)
    const data = await res.json()
    const { country } = data.results[0].components.country
    if (country) return country
    return 'location not found'
  } catch (e) {
    return 'cant fetch data from api.opencagedata.com'
  }
}

test('the data ', async () => {
  expect.assertions(1)
  const data = await getCurrentLocationName('en', 55, 33)
  expect(typeof data).toBe('string')
})

test('the data ', async () => {
  expect.assertions(1)
  const data = await getCurrentLocationName('en', 155, 33)
  expect(data).toBe('cant fetch data from api.opencagedata.com')
})

test('the data ', async () => {
  expect.assertions(1)
  const data = await getCurrentLocationName('en', 's', 'l')
  expect(data).toBe('cant fetch data from api.opencagedata.com')
})

