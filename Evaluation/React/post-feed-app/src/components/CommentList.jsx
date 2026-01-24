import React from "react";
import "./styles.css";
const commentList = ({comments}) => {
    return (
        <div className="comment-list">
            <h3 className="comments-title">
                comments ({comments.length})
            </h3>
            {comments.map((comment) => (
                
            ))}
        </div>
    )
}