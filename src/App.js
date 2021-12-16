import React, { useState } from 'react'
import './App.css'
import DateRange from './components/DateRange'
import Analysis from './components/Analysis'
import getBitcoinMarketData from './api/CryptoAPI'

function App() {
  const [marketData, setMarketData] = useState(null)
  const [dateRange, setDateRange] = useState(null)

  const getMarketData = async (start, end) => {
    const data = await getBitcoinMarketData(start, end)

    // Show error message if data is unavailable
    if (data === undefined || data.dailyPrices.length === 0) { return console.log('unable to analyze') }

    setDateRange({ start, end })
    setMarketData(data)
  }

  return (
    <div className="App">
      <h1 className="App__title">Bitcoin market analyzer</h1>
      <DateRange getMarketData={getMarketData} />
      {marketData &&
        <Analysis marketData={marketData} dateRange={dateRange} />}
    </div>
  )
}

export default App
