import React from 'react'

const DataContainer = ({ marketData }) => {
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
    <div className="DataContainer">
      Info
      <div className="DatContainer__downward-trend">
        <p>{getDownwardTrend()}</p>
      </div>
    </div>
  )
}

export default DataContainer



/* if (currPrice < prevPrice) {
  counter += 1
  if (index === arr.length - 1) {
    trend = counter
  }
} else {
  if (counter > trend) {
    trend = counter
  }
  counter = 0
} */




//console.log(dailyPrice.price)
      // Skip for the last one
/* if (index === 0) return

const currentPrice = dailyPrice.price
const prevPrice = arr[index - 1].price
const lastPrice = arr[arr.length - 1]

console.log('current: ', currentPrice)
console.log('prev: ', prevPrice)

if (currentPrice === lastPrice) {
  if (currentPrice < prevPrice) {
    downwardCounter += 1
  }
  return downwardTrend = downwardCounter
}

if (currentPrice < prevPrice) {
  downwardCounter += 1
  console.log(downwardCounter)
} else {
  if (downwardCounter > downwardTrend) {
    downwardTrend = downwardCounter
  } else if (index === arr.length - 1) {
    downwardTrend = downwardCounter
  }
  downwardCounter = 0
} */