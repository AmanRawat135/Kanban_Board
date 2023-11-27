// EmpData.js
import React, { useState, useEffect } from 'react';
import Card from '../card/card'; 
import axios from 'axios';
import ThHeading from '../thheading/thheading'; 
import './empdata.css'; 
import Top from '../top/top'; 

const EmpData = () => {
  const [myData, setMyData] = useState({ tickets: [], users: [] });
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'priority'); 
  const [sortMethod, setSortMethod] = useState(localStorage.getItem('sortMethod') || 'priority'); 

  useEffect(() => {
    const getMyPostData = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        setMyData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getMyPostData();
  }, []);

  const getUserName = (userId) => {
    const user = myData.users.find((emp) => emp.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  const groupedData = myData.tickets.reduce((acc, ticket) => {
    const key = ticket[groupBy];
    acc[key] = acc[key] || [];
    acc[key].push(ticket);
    return acc;
  }, {});

  const sortedKeys =
    groupBy === 'status'
      ? ['Backlog', 'Todo', 'In progress', 'Done', 'Completed']
      : groupBy === 'priority'
      ? [0, 4, 3, 2, 1]
      : Object.keys(groupedData);

  const sortingFunction = (a, b) => {
    if (sortMethod === 'priority') {
      return b - a;
    } else if (sortMethod === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      return 0;
    }
  };

  const toggleGrouping = (newGroupBy) => {
    setGroupBy(newGroupBy);
    localStorage.setItem('groupBy', newGroupBy);
  };

  const toggleSorting = (newSortMethod) => {
    setSortMethod(newSortMethod);
    localStorage.setItem('sortMethod', newSortMethod); 
  };

  return (
    <div>
      <Top
        groupBy={groupBy}
        sortMethod={sortMethod}
        toggleGrouping={toggleGrouping}
        toggleSorting={toggleSorting}
      />

      <div className="grid-container">
        {sortedKeys.map((key) => (
          <div key={key} className="group">
            <ThHeading
              keyName={key}
              groupBy={groupBy}
              getUserName={getUserName}
              cardsCount={groupedData[key]?.length || 0} 
            />

            {groupedData[key]?.sort((a, b) => sortingFunction(a, b)).map((ticket) => {
              const { id, title, status, userId } = ticket;

              return (
                <div key={id} className="card-wrapper">
                  <Card
                    key={id}
                    title={title}
                    id={id}
                    userId={userId}
                    status={status}
                    user={myData.users.find((user) => user.id === userId)}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmpData;
