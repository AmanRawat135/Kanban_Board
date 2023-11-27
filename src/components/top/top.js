import React, { useState } from 'react';
import "./top.css";
import Popup from '../Popup/Poppu'; 

const Top = ({ groupBy, sortMethod, toggleGrouping, toggleSorting }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="top">
      <button className="display" onClick={togglePopup}>
        Display
        <div className="gray-rectangle"></div>
      </button>

      {isPopupVisible && (
        <Popup
          groupBy={groupBy}
          sortMethod={sortMethod}
          toggleGrouping={toggleGrouping}
          toggleSorting={toggleSorting}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default Top;
