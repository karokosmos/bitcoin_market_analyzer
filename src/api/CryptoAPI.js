import axios from 'axios'

const baseUrl = 'https://api.coingecko.com/api/v3/'

// Returns only one value for each date, as close as possible for midnight
const getDailyValues = allValues => {
  const dailyValues = allValues.filter((value, index, arr) => {
    if (index === 0) return value

    const currDay = new Date(value[0]).getDay()
    const prevValue = arr[index - 1]
    const prevDay = new Date(prevValue[0]).getDay()

    if (currDay !== prevDay) {
      return value
    } else {
      return false
    }
  })
    .map(day => {
      return {
        date: day[0],
        value: day[1]
      }
    })

  return dailyValues
}

// Get bitcoin market data for the provided date range, startDate and endDate as UNIX timestamps
const getBitcoinMarketData = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${baseUrl}/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startDate}&to=${endDate}`)

    const dailyPrices = getDailyValues(response.data.prices)
    const dailyVolumes = getDailyValues(response.data.total_volumes)

    return {
      dailyPrices,
      dailyVolumes
    }
  } catch (error) {
    console.log(error)
  }
}

export default getBitcoinMarketData