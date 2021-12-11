import React from 'react'
import './Analysis.css'
import Card from './Card'

const Analysis = ({ analysis }) => {
  return (
    <div className="Analysis">
      {/* <p>Analysis</p> */}
      <div className="Analysis__cards">
        <Card
          title='Downward trend'
          data={analysis.downwardTrend}
          dataType='days'
          info='The maximum amount of days bitcoin’s price was decreasing in a row.'
        />
        <Card
          title='Highest trading volume'
          dataTitle={analysis.highestVolume.date}
          data={analysis.highestVolume.value}
          dataType='eur'
          info='The date with the highest trading volume and the volume on that day in euros.'
        />
      </div>
    </div>
  )
}

export default Analysis