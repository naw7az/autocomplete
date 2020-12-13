import React, { useState, Fragment } from 'react';
import './Autocomplete.css';
import CardList from './CardList';
import SuggestionBox from './SuggestionBox';

// this component all the autocompletion and suggestion in search box
const Autocomplete = ({ options }) =>  {
  const [activeOption, setActiveOption] = useState(-1); // selected option
  const [filteredOptions, setFilteredOptions] = useState([]); // available option
  const [showOptions, setShowOptions] = useState(false); // show all available option or not
  const [userInput, setUserInput] = useState('');  // user input
  const [showCards, setShowCards] = useState(false);  // for client side rendering
  const [userData, setUserData] = useState([]);  
  
  // to check user input in search bar and filter data accordingly.
  const onChange = (e) => {
    console.log('onChanges');

    const input = e.currentTarget.value;
    const newOptions = options.filter(
      (user) => {
          const items = user.items;
          delete user.items
          const values = Object.values(user);
          const allValues = values.concat(items)
          user.items = items;
          var value;
          for (value of allValues) {
              if (value.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                  return true;
              }  
          }
          return false;
      }
    );

    setFilteredOptions(newOptions);
    setShowOptions(true);
    setUserInput(e.currentTarget.value)
  };

  // when clicked on a suggestion box
  const onClick = (index) => {
    console.log('onClick');
    setShowOptions(false);
    setShowCards(true);
    setUserData([filteredOptions[index]])
    setUserInput('');
    setActiveOption(-1);
  };

  // when a key is pressed
  const onKeyDown = (e) => {
    // if 'enter' is pressed
    if (e.keyCode === 13) {
      // 'enter' pressed before selecting any search result.
      if (activeOption === -1) {
        setUserData(filteredOptions)
        // 'enter' pressed after selecting a search result.
      } else {
        setUserData([filteredOptions[activeOption]])
      }
      setShowOptions(false);
      setShowCards(true);
      setUserInput('');
      setActiveOption(-1);
      // if 'up' key is pressed
    } else if (e.keyCode === 38) {
      // if 'up' key is pressed before selecting any suggestion
      if (activeOption === -1) {
        return;
      }
      setActiveOption((activeOption) => activeOption - 1);
      // if 'down' key is pressed
    } else if (e.keyCode === 40) {
      // if 'down' key is pressed at the last selected suggestion
      if (activeOption === filteredOptions.length - 1) {
        console.log(activeOption);
        return;
      }
      setActiveOption((activeOption) => activeOption + 1);
    }
  };

  let optionList;
  // if options available and user entered something in searchbox
  if (showOptions && userInput) {
    if (filteredOptions.length) {
      optionList = (
        <ul className="options">
          {filteredOptions.map((user, index) => {
            let className;
            if (index === activeOption) {
              className = 'option-active';
            }
            return (
              <li className={className} key={user.id} onClick={() => onClick(index)}>
                <SuggestionBox user={user} />
              </li>
            );
          })}
        </ul>
      );
      // if no search matches with the data
    } else {
      optionList = (
        <div className="no-options">
          <h2>No User Found!</h2>
        </div>
      );
    }
  }
  return (
    <div>
      {showCards
      ? <div>
          <button className='home' onClick={() => setShowCards(false)}> {`<< Home Page`}</button>
          <CardList userData={userData}/>
        </div> 
      : (
        <Fragment>
          <div className="search">
          <input
            type="text"
            className="search-box"
            placeholder='Search users by ID, name, address, pincode, items ...'
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          <input type="submit" value="" className="search-btn" />
          </div>
          {optionList}
        </Fragment>
        )
      }
    </div>
  );
}

export default Autocomplete;
