import React, { useState } from 'react'
import './App.css'
import DateRange from './components/DateRange'
import Analysis from './components/Analysis'
import getBitcoinMarketData from './api/CryptoAPI'

function App() {
  const [analysis, setAnalysis] = useState(null)

  const createAnalysis = async (startDate, endDate) => {
    const data = await getBitcoinMarketData(startDate, endDate)

    const analysis = {
      startDate,
      endDate,
      downwardTrend: getDownwardTrend(data.dailyPrices),
      highestVolume: getHighestValue(data.dailyVolumes),
      bestDayToSell: getHighestValue(data.dailyPrices),
      bestDayToBuy: getLowestValue(data.dailyPrices)
    }
    setAnalysis(analysis)
  }

  const getDownwardTrend = (dailyPrices) => {
    let trend = 0
    let counter = 0

    dailyPrices.forEach((dailyPrice, index, arr) => {
      if (index === 0) return

      const currPrice = dailyPrice.value
      const prevPrice = arr[index - 1].value

      if (currPrice < prevPrice && index === arr.length - 1) {
        counter += 1
        trend = counter
      } else if (currPrice < prevPrice) {
        counter += 1
      } else if (currPrice >= prevPrice && counter > trend) {
        trend = counter
        counter = 0
      } else {
        counter = 0
      }
    })
    return trend
  }

  const getHighestValue = (dailyValues) => {
    return dailyValues.reduce((prev, curr) =>
      prev.value > curr.value ? prev : curr
    )
  }

  const getLowestValue = (dailyValues) => {
    return dailyValues.reduce((prev, curr) =>
      prev.value < curr.value ? prev : curr
    )
  }

  return (
    <div className="App">
      <h1 className="App__title">Bitcoin market analyzer</h1>
      <DateRange createAnalysis={createAnalysis} />
      {analysis &&
        <Analysis analysis={analysis} />}
    </div>
  )
}

export default App
