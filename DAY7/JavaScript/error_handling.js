async function fetchDataWithRetry(url, maxRetries = 3, delay = 500) {
    let attempt = 0;
    while(attempt < maxRetries ){
        try
        {
            const response = await fetch(url);
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        }
        catch(error){
            attempt++;
            if(attempt === maxRetries){
                throw new Error(
                    `Failed after ${maxRetries} attempts: ${error.message}`
                );
            }
            const delay = baseDelay * Math.pow(2, attempt);
            console.warn(
                `Retry ${attempt} after ${delay}ms`
            );
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

fetchDataWithRetry("https://jsonplaceholder.typicode.com/posts/1")
    .then(data => console.log(data))
    .catch(err => console.error(err.message));