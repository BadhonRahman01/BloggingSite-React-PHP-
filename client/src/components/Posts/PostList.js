// src/components/Posts/PostList.js
import React, { useState, useEffect } from 'react';
import { postAPI } from '../../api/axios';
import PostForm from './PostForm';
import CommentList from './CommentList';
import '../../App.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postAPI.getAllPosts();
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const addPost = (post) => setPosts([...posts, post]);

  const updatePost = (updatedPost) => {
    setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
    setSelectedPost(null);
  };

  const deletePost = async (id) => {
    try {
      await postAPI.deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (post) => setSelectedPost(post);

  return (
    <div className="posts-page-container">
      <h2>Post List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="post-list">
            {posts.length > 0 ? (
              posts.map((post) => (
                <li key={post.id} className="post-item">
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <div>
                    <button onClick={() => handleEdit(post)} className="post-editButton">Edit</button>
                    <button onClick={() => deletePost(post.id)} className="post-deleteButton">Delete</button>
                  </div>
                  <CommentList postId={post.id} />
                </li>
              ))
            ) : (
              <p>No posts available. Add a post to get started.</p>
            )}
          </ul>
        </>
      )}
      <div className="post-form-container">
        <PostForm addPost={addPost} updatePost={updatePost} selectedPost={selectedPost} />
      </div>
    </div>
  );
};

export default PostList;
