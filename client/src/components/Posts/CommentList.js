// src/components/Posts/CommentList.js
import React, { useState, useEffect } from 'react';
import { commentAPI } from '../../api/axios';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await commentAPI.getCommentsByPost(postId);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  return (
    <div className="comment-list-container">
      <h4>Comments</h4>
      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length > 0 ? (
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentList;
