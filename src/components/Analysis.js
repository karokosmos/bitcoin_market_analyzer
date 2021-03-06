import React from 'react'
import PropTypes from 'prop-types'
import './Analysis.css'
import AnalysisCards from './AnalysisCards'
import { getDateFromTimestamp } from '../utils/dates'

const Analysis = ({ marketData }) => {
  const startDate = getDateFromTimestamp(marketData.startDate * 1000)
  const endDate = getDateFromTimestamp(marketData.endDate * 1000)

  const createAnalysis = _ => {
    return {
      downwardTrend: getDownwardTrend(marketData.dailyPrices),
      highestVolume: getHighestValue(marketData.dailyVolumes),
      bestDaysToTrade: getBestDaysToTrade(marketData.dailyPrices)
    }
  }

  const getDownwardTrend = (dailyPrices) => {
    let trend = 0
    let counter = 0

    dailyPrices.forEach((price, index, arr) => {
      if (index === 0) return

      const currPrice = price.value
      const prevPrice = arr[index - 1].value

      if (currPrice < prevPrice) {
        counter += 1
        if (index === arr.length - 1 && counter > trend) {
          trend = counter
        }
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

  const getBestDaysToTrade = (dailyValues) => {
    let maxProfit = 0
    let lowestPrice = dailyValues[0].value
    let buyIndex = 0
    let bestDayToBuy
    let bestDayToSell

    dailyValues.forEach((day, index, arr) => {
      if (day.value < lowestPrice) {
        lowestPrice = day.value
        buyIndex = index
      }

      const profit = day.value - lowestPrice

      if (profit > maxProfit) {
        maxProfit = profit
        bestDayToSell = day
        bestDayToBuy = arr[buyIndex]
      }
    })

    // If price is only decreasing in the given date range, return null (indicating that one should not buy or sell)
    if (!bestDayToBuy && !bestDayToSell) {
      return null
    }
    return {
      buy: bestDayToBuy.date,
      sell: bestDayToSell.date
    }
  }

  return (
    <div className="Analysis">
      <p className="Analysis__dates">{startDate} - {endDate}</p>
      <AnalysisCards analysis={createAnalysis()} />
    </div>
  )
}

Analysis.propTypes = {
  marketData: PropTypes.object.isRequired
}

export default Analysis