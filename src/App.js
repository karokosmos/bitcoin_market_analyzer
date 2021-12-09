import React, { useState } from 'react'
import './App.css'
import DateRange from './components/DateRange'
import DataContainer from './components/DataContainer'
import getBitcoinMarketData from './api/CryptoAPI'

function App() {
  const [marketData, setMarketData] = useState(null)

  const getMarketData = async (startDate, endDate) => {
    //console.log('start: ', startDate, 'end: ', endDate)
    //console.log(new Date(startDate * 1000), new Date(endDate * 1000))

    const data = await getBitcoinMarketData(startDate, endDate)
    //console.log(data)
    setMarketData(data)
  }

  return (
    <div className="App">
      <h1 className="App__title">Bitcoin market analyzer</h1>
      <DateRange getMarketData={getMarketData} />
      {marketData &&
        <DataContainer marketData={marketData} />}
    </div>
  )
}

export default App
