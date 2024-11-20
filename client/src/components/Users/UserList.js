// src/components/Users/UserList.js
import React, { useState, useEffect } from 'react';
import { userAPI } from '../../api/axios';
import UserForm from './UserForm';
import '../../App.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await userAPI.getAllUsers();
             console.log("Response:", response);
            setUsers(response.data.data);  // Set users as the array of user objects
            console.log("Users:", response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchUsers();
}, []);

const addUser = async (user) => {
  try {
    const response = await userAPI.addUser(user);
    setUsers((prevUsers) => [...prevUsers, response.data]); 
  } catch (error) {
    console.error("Error adding user:", error);
  }
};


  const updateUser = async (updatedUser) => {
    try {
      const response = await userAPI.updateUser(updatedUser);
      setUsers(users.map((user) => (user.user_id === response.data.user_id ? response.data : user)));
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await userAPI.deleteUser(id);
      setUsers(users.filter((user) => user.user_id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="user-list">
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.user_id} className="user-item">
                <p>{user.username} {user.email} ({user.display_name}) - {user.role}</p>
                <button onClick={() => setSelectedUser(user)} className="user-editButton">Edit</button>
                <button onClick={() => deleteUser(user.user_id)} className="user-deleteButton">Delete</button>
              </li>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </ul>
      )}
      <UserForm addUser={addUser} updateUser={updateUser} selectedUser={selectedUser} />
    </div>
  );
};

export default UserList;
