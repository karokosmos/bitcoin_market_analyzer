import React, { useState } from 'react'
import './App.css'
import DateRange from './components/DateRange'
import Analysis from './components/Analysis'
import getBitcoinMarketData from './api/CryptoAPI'

function App() {
  const [marketData, setMarketData] = useState()
  const [errorMessage, setErrorMessage] = useState()

  const getMarketData = async (start, end) => {
    const data = await getBitcoinMarketData(start, end)

    // Check if data is available
    if (data && data.dailyPrices.length > 0) {
      setErrorMessage()
      setMarketData(data)
    } else {
      setErrorMessage('Unable to analyze. Please try again!')
      setMarketData()
    }
  }

  return (
    <div className="App">
      <h1 className="App__title">Bitcoin market analyzer</h1>
      <DateRange getMarketData={getMarketData} />
      {errorMessage && <p>{errorMessage}</p>}
      {marketData && <Analysis marketData={marketData} />}
    </div>
  )
}

export default App
