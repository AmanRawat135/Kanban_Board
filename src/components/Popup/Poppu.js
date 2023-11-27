import React, { useRef, useEffect } from 'react';
import "./Popup.css";

const Popup = ({ groupBy, sortMethod, toggleGrouping, toggleSorting, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose(); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleGroupingChange = (e) => {
    toggleGrouping(e.target.value);
    onClose(); 
  };

  const handleSortingChange = (e) => {
    toggleSorting(e.target.value);
    onClose();
  };

  return (
    <div className="popup" ref={popupRef}>
      <label>
        Grouping
        <select value={groupBy} onChange={handleGroupingChange}>
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="userId">User</option>
        </select>
      </label>
      <label>
        Ordering  
        <select value={sortMethod} onChange={handleSortingChange}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </label>
    </div>
  );
};

export default Popup;
