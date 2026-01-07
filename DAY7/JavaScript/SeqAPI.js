async function fetchUserPostCommentSummary(){
    try{
        const userRes = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const user = await userRes.json();
        const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1");
        const posts = await postsRes.json();
        if(!posts.length){
            throw new Error("No posts found for the user.");
        }
        const firstPost = posts[0];
        const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${firstPost.Id}`);
        const comments = await commentsRes.json();
        return {
            userName: user.name,
            firstPostTitle: firstPost.title,
            commentCount: comments.length,
            topComment: comments[0]?.body || null
        };
    }
    catch(error){
        console.error("Error fetching data:", error.message)
    }
}

fetchUserPostCommentSummary().then(data => console.log(data))