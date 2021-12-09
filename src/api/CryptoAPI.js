import axios from 'axios'

const baseUrl = 'https://api.coingecko.com/api/v3/'

// Returns only one price point for each date, as close as possible for midnight
const getDailyPrices = prices => {
  const dailyPrices = prices.filter((price, index, arr) => {
    if (index === 0) return price

    const currDay = new Date(price[0]).getDay()
    const prevPrice = arr[index - 1]
    const prevDay = new Date(prevPrice[0]).getDay()

    if (currDay !== prevDay) {
      return price
    } else {
      return false
    }
  })
    .map(price => {
      return {
        date: price[0],
        price: price[1]
      }
    })

  return dailyPrices
}

// Get bitcoin market data for the provided date range, startDate and endDate as UNIX timestamps
const getBitcoinMarketData = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${baseUrl}/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startDate}&to=${endDate}`)

    const dailyPrices = getDailyPrices(response.data.prices)

    return {
      dailyPrices
    }

  } catch (error) {
    console.log(error)
  }
}

export default getBitcoinMarketData


/* const massaged = {
        prices: response.data.prices.map(price => [new Date(price[0]), price[1]])
      }
      console.log(massaged) */

/* const marketData = {
  prices: dailyPrices.map(price => [new Date(price[0]), price[1]])
}

console.log(dailyPrices) */