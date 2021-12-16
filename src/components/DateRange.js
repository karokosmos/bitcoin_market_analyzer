import React, { useState } from 'react'
import './DateRange.css'
import { getUnixFromInput } from '../utils/dates'

const DateRange = ({ getMarketData }) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startTimestamp, setStartTimestamp] = useState()
  const [endTimestamp, setEndTimestamp] = useState()

  const handleChange = e => {
    const name = e.target.name
    const dateValue = e.target.value
    const unixTimestamp = getUnixFromInput(dateValue)

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
      <div className="DateRange__group">
        <label className="DateRange__label" htmlFor="start-date">Start date</label>
        <input
          className="DateRange__input"
          name="start-date"
          type="date"
          value={startDate}
          onChange={handleChange}
        />
      </div>
      <div className="DateRange__group">
        <label className="DateRange__label" htmlFor="end-date">End date</label>
        <input
          className="DateRange__input"
          name="end-date"
          type="date"
          value={endDate}
          onChange={handleChange}
        />
      </div>
      <button className="DateRange__button" type="submit">Analyze</button>
    </form>
  )
}

export default DateRange