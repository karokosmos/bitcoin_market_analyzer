import React, { useState } from 'react'

const Form = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  console.log(startDate, endDate)

  return (
    <form className="Form">
      <input
        className="Form__input"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        className="Form__input"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button className="Form__button" type="submit">Analyze</button>
    </form>
  )
}

export default Form