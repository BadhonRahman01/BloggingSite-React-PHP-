// src/components/Posts/PostForm.js
import React, { useState, useEffect } from 'react';
import { postAPI } from '../../api/axios';

const PostForm = ({ addPost, updatePost, selectedPost }) => {
  const [form, setForm] = useState({ id: null, title: '', content: '' });

  useEffect(() => {
    if (selectedPost) setForm(selectedPost);
  }, [selectedPost]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      try {
        const response = await postAPI.updatePost(form.id, form);
        updatePost(response.data);
      } catch (error) {
        console.error("Error updating post:", error);
      }
    } else {
      try {
        const response = await postAPI.createPost(form);
        addPost(response.data);
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
    setForm({ id: null, title: '', content: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleInputChange}
        placeholder="Title"
        required
        className="post-input"
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleInputChange}
        placeholder="Content"
        required
        className="post-input"
      />
      <button type="submit" className="post-button">
        {form.id ? 'Update Post' : 'Add Post'}
      </button>
    </form>
  );
};

export default PostForm;
