async function fetchSActiveUsers() {
    try{
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await res.json();
        const result = users.filter(user => user.username.length > 6)
        .map(user => ({
            id: user.id,
            fullName: user.name,
            email: user.email
        }));
        return result;
    }
    catch(error){
        console.error("Error fetching users:", error);
    }
}

fetchSActiveUsers().then(data => console.log(data));