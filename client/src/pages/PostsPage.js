// src/pages/PostsPage.js
import React from 'react';
import PostList from '../components/Posts/PostList';

const PostsPage = () => {
  return (
    <div className="posts-page">
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};

export default PostsPage;
