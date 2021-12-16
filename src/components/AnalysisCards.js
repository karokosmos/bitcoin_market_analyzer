import React from 'react'
import PropTypes from 'prop-types'
import './AnalysisCards.css'
import Card from './Card'
import { getDateFromTimestamp } from '../utils/dates'

const AnalysisCards = ({ analysis }) => {
  const dataTypeForDays = analysis.downwardTrend > 1 ? 'days' : 'day'

  const getCardsForTradingDays = () => {
    if (!analysis.bestDaysToTrade) {
      return (
        <Card
          title='Do not buy or sell bitcoins.'
          info='In the given date range the price is only decreasing.'
        />
      )
    }
    return (
      <>
        <Card
          title='Best day to buy'
          data={getDateFromTimestamp(analysis.bestDaysToTrade.buy)}
        />
        <Card
          title='Best day to sell'
          data={getDateFromTimestamp(analysis.bestDaysToTrade.sell)}
        />
      </>
    )
  }

  return (
    <div className="AnalysisCards">
      <Card
        title='Downward trend'
        data={analysis.downwardTrend}
        dataType={dataTypeForDays}
        info='The maximum amount of days bitcoin’s price was decreasing in a row.'
      />
      <Card
        title='Highest trading volume'
        subtitle={getDateFromTimestamp(analysis.highestVolume.date)}
        data={analysis.highestVolume.value}
        dataType='eur'
        info='The date with the highest trading volume and the volume on that day in euros.'
      />
      {getCardsForTradingDays()}
    </div>
  )
}

AnalysisCards.propsTypes = {
  analysis: PropTypes.object.isRequired
}

export default AnalysisCards