// src/pages/UsersPage.js
import React from 'react';
import UserList from '../components/Users/UserList';

const UsersPage = () => {
  return (
    <div className="users-page">
      <h1>Users</h1>
      <UserList />
    </div>
  );
};

export default UsersPage;
