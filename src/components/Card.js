import React from 'react'
import './Card.css'

const Card = ({ title, subtitle, data, dataType, info }) => {
  return (
    <div className="Card">
      <p className="Card__title">{title}</p>
      <div className="Card__content">
        <p className="Card__subtitle">{subtitle}</p>
        <div className="Card__data-container">
          <p className="Card__data">{data}</p>
          <p className="Card__data-type">{dataType}</p>
        </div>
      </div>
      {info &&
        <div className="Card__wrapper">
          <div className="Card__tooltip">
            <i className="Card__button fas fa-question-circle"></i>
            <p className="Card__info">{info}</p>
          </div>
        </div>}
    </div>
  )
}

//proptypes

export default Card