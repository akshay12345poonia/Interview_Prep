import axios from axios;

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async () => {
    try
    {
        const response = await axios.get(`${API_BASE_URL}/posts`);
        return response.data;
    }
    catch (error)
    {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export const fetchUser = async () => {
    try
    {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    }
    catch (error)
    {
        console.error(`Error fetching user ${userId}:`, error);
        throw error;
    }
}

export const fetchComments = async (postId) => {
    try
    {
        const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
        return response.data;
    }
    catch (error)
    {
        console.error(`Error fetching comments for post ${postId}:`, error);
        throw error;
    }
}