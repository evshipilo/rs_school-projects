function setDaytimeAndYeartime(dms, offset) {
  const d = new Date()
  const utc = d.getTime() + (d.getTimezoneOffset() * 60000)
  const nd = new Date(utc + (1000 * offset))
  const month = nd.getMonth()
  const hour = nd.getHours()
  const [,,, southNorth] = dms.split(' ')
  // this.setState({ dayOfWeek: nd.getDay() })
  let season
  if (southNorth === 'N') {
    if (month === 11 || month === 0 || month === 1) season = 'winter'
    if (month === 2 || month === 3 || month === 4) season = 'spring'
    if (month === 5 || month === 6 || month === 7) season = 'summer'
    if (month === 8 || month === 9 || month === 10) season = 'autumn'
  }
  if (southNorth === 'S') {
    if (month === 11 || month === 0 || month === 1) season = 'summer'
    if (month === 2 || month === 3 || month === 4) season = 'autumn'
    if (month === 5 || month === 6 || month === 7) season = 'winter'
    if (month === 8 || month === 9 || month === 10) season = 'spring'
  }
  let day
  if (hour >= 6 && hour < 10) day = 'morning'
  if (hour >= 10 && hour < 18) day = 'day'
  if (hour >= 18 && hour <= 23) day = 'evening'
  if (hour >= 0 && hour < 6) day = 'night'

  return `${season}, ${day}`
}

test('setDaytimeAndYeartime', () => {
  const result = setDaytimeAndYeartime('sj 1j jj N', 10800)
  expect(result).toBe('spring, day')
})

test('setDaytimeAndYeartime', () => {
  const result = setDaytimeAndYeartime('sj 1j jj S', 10800)
  expect(result).toBe('autumn, day')
})
