import React from 'react'
import './Analysis.css'
import Card from './Card'

const Analysis = ({ marketData }) => {
  const getDownwardTrend = () => {
    const dailyPrices = marketData.dailyPrices
    let trend = 0
    let counter = 0

    dailyPrices.forEach((dailyPrice, index, arr) => {
      if (index === 0) return

      const currPrice = dailyPrice.price
      const prevPrice = arr[index - 1].price

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
    console.log('trend: ', trend)
    return trend
  }

  return (
    <div className="Analysis">
      <p>Analysis</p>
      <div className="Analysis__cards">
        <Card
          title='Downward trend'
          data={getDownwardTrend()}
          dataType='days'
          info='The maximum amount of days bitcoin’s price was decreasing in a row.'
        />
      </div>
    </div>
  )
}

export default Analysis