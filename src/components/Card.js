import React from 'react';
import './Card.css'

// this component render a single card
const Card = ({ id, name, address, items, pincode  }) => {

  return (
    <div className='card'>
      <h3> ID: {id} </h3>
      <i className='card_name'> Name: {name} </i>
      <p className='card_grey'> Address: {address} </p>
      <p className='card_grey'> Pincode: {pincode} </p>
      <div className='card_items'>
        Items: [
        {items.map((item, idx) => {
          return(
            <div key={idx}>
              {item}
            </div>
            )
        })}
        ]
      </div>
    </div>
  );
}

export default Card;