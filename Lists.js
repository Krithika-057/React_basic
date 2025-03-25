import React from 'react';
import "./scss/Lists.scss";


const UserList = ({ users = [] }) => {
    return (
      <div id='user-list-container'>
        {users.length > 0 ? (
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                {user.firstName} {user.lastName} - {user.email}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users submitted yet!</p>
        )}
      </div>
    );
  };

  export default UserList;