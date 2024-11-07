// src/components/Users/UserForm.js
import React, { useState, useEffect } from 'react';
import { userAPI } from '../../api/axios';

const UserForm = ({ addUser, updateUser, selectedUser }) => {
  const [form, setForm] = useState({ id: null, name: '', email: '' });

  useEffect(() => {
    if (selectedUser) setForm(selectedUser);
  }, [selectedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      try {
        const response = await userAPI.updateUser(form.id, form);
        updateUser(response.data);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      try {
        const response = await userAPI.createUser(form);
        addUser(response.data);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
    setForm({ id: null, name: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleInputChange}
        placeholder="Name"
        required
        className="user-input"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
        className="user-input"
      />
      <button type="submit" className="user-button">
        {form.id ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;
