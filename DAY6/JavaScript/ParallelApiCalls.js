async function fetchUsersWithPostCount(){
    try{
        const [usersRes, postsRes]= await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users"),
            fetch("https://jsonplaceholder.typicode.com/posts")
        ])
        const users = await usersRes.json();
        const posts = await postsRes.json();
        const postCountMap = posts.reduce((acc, post) => {
            acc[post.userId]= (acc[post.userId] || 0) + 1;
            return acc
        }, {})
        const result = users.map(user => ({
            userId: user.id,
            name: user.name,
            postCount: postCountMap[user.id] || 0
        }));
        return result
    }
    catch (error){
        console.error("Error", error);
    }
}

fetchUsersWithPostCount().then(data => console.log(data))