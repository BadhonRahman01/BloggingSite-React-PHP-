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
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const addUser = (user) => setUsers([...users, user]);

  const updateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setSelectedUser(null);
  };

  const deleteUser = async (id) => {
    try {
      await userAPI.deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => setSelectedUser(user);

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="user-list">
            {users.length > 0 ? (
              users.map((user) => (
                <li key={user.id} className="user-item">
                  <span>{user.username}</span>
                    <span>{user.email}</span>
                  <button onClick={() => handleEdit(user)} className="user-editButton">Edit</button>
                  <button onClick={() => deleteUser(user.id)} className="user-deleteButton">Delete</button>
                </li>
              ))
            ) : (
              <p>No users available. Add a user to get started.</p>
            )}
          </ul>
        </>
      )}
      <UserForm addUser={addUser} updateUser={updateUser} selectedUser={selectedUser} />
    </div>
  );
};

export default UserList;
