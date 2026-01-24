import React, {useState, useEffect} from "react";
import CommentList from "./CommentList";
import {fetchComments} from "../services/api";


import "./styles.css";

const PostItem = ({post, user, isExpanded, onToggleComments}) => {
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentsError, setCommentsError] = useState(null);

    useEffect(() => {
        if(isExpanded && comments.length === 0){
            loadComments();
        }
    }, [isExpanded]);
    const loadComments = async () => {
        try {
            setCommentsLoading(true);
            const commentsData = await fetchComments(post.id);
            setComments(commentsData);
            setCommentsError(null);
        }
        catch (err){
            setCommentsError("Failed to load comments");
            console.error(err);
        }
        finally {
            setCommentsLoading(false);
        }
    };

    return (
        <div className="post-card">
            <div className="post-header">
                <h2 className="post-title">{post.title}</h2>
            </div>

            <div className="post-body">
                <p>{post.body}</p>
            </div>

            <div className="post-footer">
                <div className="user-info">
                    <span className="user-icon">🕴️</span>
                    <span className="usename">
                        {user ? user.name : "Loading..."}
                    </span>
                </div>

                <button className="comments-button"
                    onClick={() => onToggleComments(post.id)}
                    aria-label={isExpanded ? "Hide comments" : "Show comments"}
                >
                    <span className="comment-icon">💬</span>
                    <span className="comment-count">
                        {comments.length > 0 ? comments.length : "0" } comments
                    </span>
                    <span className="toggle-icon">
                        {isExpanded ? "🔼" : "🔽"}
                    </span>

                </button>

            </div>
            {isExpanded && (
                <div className="comments-section">
                    {commentsLoading ? (
                    <div className="comments-loading">
                        <p>Loading comments...</p>
                    </div>
                
            ) : commentsError ? (
                <div className="comments-error">
                    <p>{commentsError}</p>
                    <button onClick={loadComments} className="retry-button small">
                        Retry
                    </button>
                </div>
            ) : (
                <CommentList comments={comments} />
            )}
        </div>
        )}
        </div>
    )
}

export default PostItem;