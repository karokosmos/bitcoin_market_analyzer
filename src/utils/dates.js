// Takes timestamp as milliseconds and returns local date
export const getDateFromTimestamp = timestamp => {
  const date = new Date(timestamp)
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
  return date.toLocaleDateString(undefined, options)
}

// Parses date input to a unix timestamp
export const getUnixFromInput = input => {
  const dateArr = input.split('-')
  const year = Number(dateArr[0])
  const month = Number(dateArr[1]) - 1
  const day = Number(dateArr[2])

  const date = new Date(year, month, day)
  const unixTimestamp = date.getTime() / 1000

  return unixTimestamp
}