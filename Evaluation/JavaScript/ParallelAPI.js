async function fetchPostWithComments(){
    try {
        const [postsResponse, commentsResponse] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts'),
            fetch('https://jsonplaceholder.typicode.com/comments')
        ]);

        const posts = await postsResponse.json();
        const comments = await commentsResponse.json();

        const postConmmentData = {};
        comments.forEach(comment => {
            const postId = comment.postId;
            if (!postConmmentData[postId]) {
                postConmmentData[postId] = {
                    count: 0,
                    firstCommentEmail: comment.email
                };
            }
            postConmmentData[postId].count++;
        });
        const mergedData = posts.map(post => {
            const commentData = postConmmentData[post.id] || { count: 0 };
            return {
                postId: post.id,
                title: post.title,
                commentCount: commentData.count,
                firstCommentEmail: commentData.firstCommentEmail || null
            }
        })
        .filter(post => post.commentCount > 0).sort((a, b) => b.commentCount - a.commentCount).slice(0, 5);
        return mergedData;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        return;
    }
}

fetchPostWithComments().then(data => console.log(data));