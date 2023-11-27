import React from 'react';
import './card.css';
import { MdCircle } from "react-icons/md";
const Card = ({ id, title, user }) => {
  const getInitials = (name) => {
    const [firstName, lastName] = name.split(' ');
    return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ''}`;
  };

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  };

  return (
    <div key={id} className="card-wrapper">
      <div className="card-background">
        <div key={id} className="card">
          <div className="profile-circle">
            {user && <p className="initials">{getInitials(user.name)}</p>}
          </div>
          <p className="p1">{id}</p>
          <h6 className="th1">{truncateTitle(title, 40)}</h6>

          <div className="feature-request-box">
          <MdCircle color="rgba(128, 128, 128, 0.873)" size="10px" /> Feature request
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
