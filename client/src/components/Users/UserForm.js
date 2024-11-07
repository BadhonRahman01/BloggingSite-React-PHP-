// src/components/Users/UserForm.js
import React, { useState, useEffect } from 'react';
import { userAPI } from '../../api/axios';

const UserForm = ({ addUser, updateUser, selectedUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    display_name: '',
    role: 'subscriber',
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        username: selectedUser.username,
        email: selectedUser.email,
        password: '', // Reset password for security
        display_name: selectedUser.display_name,
        role: selectedUser.role,
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedUser) {
      await updateUser(formData);
    } else {
      await addUser(formData);
    }
    setFormData({ username: '', email: '', password: '', display_name: '', role: 'subscriber' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required={!selectedUser} />
      <input type="text" name="display_name" value={formData.display_name} onChange={handleChange} placeholder="Display Name" />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="subscriber">Subscriber</option>
        <option value="author">Author</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">{selectedUser ? 'Update User' : 'Add User'}</button>
    </form>
  );
};

export default UserForm;
