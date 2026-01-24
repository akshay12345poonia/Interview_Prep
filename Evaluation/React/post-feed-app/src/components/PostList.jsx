import React, {useState, useEffect, useCallback} from "react";
import PostItem from "./PostItem";

import "./styles.css"

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedPost, setExpandedPost] = useState(null);

    const loadData = useCallback(async () => {
        try 
        {
            setLoading(true);
            const postsData = await fetchPosts();

            const uniqueUserIds = [...new Set(postsData.map(post => post.userId))];
            const usersData = {};
            await promise.all(
                uniqueUserIds.map(async (userId) => {
                    try {
                        const userData = await fetchUser(userId);
                        usersData[userId] = userData;
                    }
                    catch (err) 
                    {
                        console.error(`Failed to fetch user ${userId}`, err);
                    }
                })
            );
            setPosts(postsData);
            setUsers(usersData);
            setError(null);
        }
        catch (err){
            setError("Failed to load posts. Please try again later.");
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const toggleComments = (postId) => {
        setExpandedPost(expandedPost === postId ? null : postId);
    };
    if(loading){
        return (
            <div className="loading-container">
                <div className="spinner">💫</div>
                <p>Loading posts...</p>
            </div>
        )
    }

    if(error) {
        return (
            <div className="error-container">
                <p>{error}</p>
                <button onClick={loadData} className="retry-button">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="post-light">
            <h1 className="page-title">Posts Feed</h1>
            <div className="posts-container">
                {posts.map((post) => (
                    <PostItem 
                        key={post.id}
                        post={post}
                        user={users[post.userId]}
                        isExpanded={expandedPost === post.id}
                        onToggleComments={toggleComments}
                    />
                ))}
            </div>
        </div>
    )
}

export default PostList;