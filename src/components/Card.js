import React from 'react'
import './Card.css'

const Card = ({ title, data, dataType, info }) => {
  return (
    <div className="Card">
      <p className="Card__title">{title}</p>
      <div className="Card__content">
        <p className="Card__data">{data}</p>
        <p className="Card__data-type">{dataType}</p>
      </div>
      <div className="Card__wrapper">
        <div className="Card__tooltip">
          <span className="Card__button material-icons">
            help_outline
          </span>
          <p className="Card__info">{info}</p>
        </div>
      </div>
    </div>
  )
}

export default Card