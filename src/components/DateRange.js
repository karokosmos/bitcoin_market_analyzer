import React, { useState } from 'react'
import './DateRange.css'

const DateRange = ({ getMarketData }) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startTimestamp, setStartTimestamp] = useState()
  const [endTimestamp, setEndTimestamp] = useState()

  /* console.log('dates: ', startDate, endDate)
  console.log('timestamps: ', startTimestamp, endTimestamp) */

  const handleChange = e => {
    const name = e.target.name
    const dateValue = e.target.value

    const dateArr = dateValue.split('-')
    const year = Number(dateArr[0])
    const month = Number(dateArr[1]) - 1
    const day = Number(dateArr[2])

    const date = new Date(year, month, day)
    const unixTimestamp = date.getTime() / 1000

    if (name === 'start-date') {
      setStartDate(dateValue)
      setStartTimestamp(unixTimestamp)
    } else {
      setEndDate(dateValue)
      setEndTimestamp(unixTimestamp + 3600) // Add an hour to include last day
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    setStartDate('')
    setEndDate('')
    getMarketData(startTimestamp, endTimestamp)
  }

  return (
    <form className="DateRange" onSubmit={handleSubmit}>
      <input
        className="DateRange__input"
        name="start-date"
        type="date"
        value={startDate}
        onChange={handleChange}
      />
      <input
        className="DateRange__input"
        name="end-date"
        type="date"
        value={endDate}
        onChange={handleChange}
      />
      <button className="DateRange__button" type="submit">Analyze</button>
    </form>
  )
}

export default DateRange