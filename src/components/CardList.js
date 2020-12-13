import React from 'react';
import Card from './Card';
import './CardList.css';

// this component loops through all the avaiable userData into cards
const CardList = ({ userData }) => {
  return (
    <div className='cards'>
      {
        userData.map((user, idx) => {
          return (
            <Card
              id = {user.id}
              key={idx}
              name ={user.name}
              address={user.address}
              items={user.items}
              pincode={user.pincode}
              />
          );
        })
      }
    </div>
  );
}

export default CardList;

