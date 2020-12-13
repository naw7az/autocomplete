import React from 'react';
import './SuggestionBox.css';

function SuggestionBox({user}) {
  return (
    <div className='suggestion'>
      <div className='suggestion_id'>{user.id}</div>
      <i>{user.name}</i>
      <div className='suggestion_address'>{user.address}</div>
      <div className='suggestion_pincode'>{user.pincode}</div>
      <div className='suggestion_items'>
        Items: [
        {user.items.map((item, idx) => {
          return(
            <div key={idx}>
              {item}
            </div>
            )
        })}
        ]
      </div>
    </div>
  )
}

export default SuggestionBox;
