// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-header">Welcome to the Blogging Site!</h1>
      <p className="home-subtext">Explore and manage users and posts below:</p>
      <div className="home-linkContainer">
        <Link to="/users" className="home-linkButton">Go to Users</Link>
        <Link to="/posts" className="home-linkButton">Go to Posts</Link>
      </div>
    </div>
  );
}

export default Home;
