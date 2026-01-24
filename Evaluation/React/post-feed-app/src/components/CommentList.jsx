import React from 'react';
import './styles.css';

const CommentList = ({ comments }) => {
  return (
    <div className="comment-list">
      <h3 className="comments-title">
        Comments ({comments.length})
      </h3>
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item">
          <div className="comment-header">
            <span className="comment-user-icon">👤</span>
            <div className="comment-user-info">
              <h4 className="comment-name">{comment.name}</h4>
              <div className="comment-email">
                <span className="email-icon">📧</span>
                <span>{comment.email}</span>
              </div>
            </div>
          </div>
          <div className="comment-body">
            <p>{comment.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;