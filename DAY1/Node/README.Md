Q1. What is HTTP and how does it work? Explain the request-response cycle.?
Ans. HTTP stands for Hyper Text Transfer Protocol it work on WWW (World Wide Web). It's Protocol Used for Client Server Communication
     HTTP Port number is 80. 
     GET- Asks the server to retrieve information we can say Visiting a website
     POST- 	Sends new information to create something we can say Submitting a form
     PUT- Replace Something on the server we can say Updating a Profile picture, Email, etc.
     DELETE- Remove Something from the server we can say Deleting a file
     
     These Used as a CRUD operation Create, Read, Update and Delete

     Request is when your browser asks the server for something
     Response is when the server sends back what you asked for (or an error)


Q2. What are the different HTTP methods (GET, POST, PUT, PATCH, DELETE) and when should each be used?
Ans2. The Five main HTTP Method
        GET - Used for Retrieve the data  GET requests data from the server without changing anything. It's the safest HTTP method because it only reads information. It it's Work as a Read only
        It's used for the fetching the user information, Display product lists, Getting Search Result

        POST - Use for create new resources  POST sends data to the server to create a completely new resource. This is how you add new information to a database.
        It's used for creating the new user account, Submitting a form, post a blog in social media, Uploading a file

        PUT - Replace Entire Resources PUT completely replaces an existing resource with new data. If you send a PUT request, any fields you don't include get removed. 
        It's used as a Updating a entire user profile, replacing all order details, Update a complete order record

        PATCH - used for partial update PATCH updates only specific fields in a resource, leaving the rest unchanged. This is different from PUT, which replaces everything.
        used for Changing just one field (like updating only email address), 
        Partial profile updates, Changing status or specific properties, Updating only necessary data to save bandwidth

        DELETE - used for Remove Resources DELETE permanently removes a resource from the serve
        used for delete user acount, delete post etc,.

Q3. Explain HTTP status codes. What's the difference between 2xx, 3xx, 4xx, and 5xx?
Ans3 2xx (200, 201, 204)	✅ Success!	Nothing, everything works
     3xx (301, 302, 304)	➡️ Redirect	Browser handles it automatically
     4xx (400, 401, 403, 404)	❌ Your fault	Fix your request/login/permissions
     5xx (500, 502, 503, 504)	❌ Server's fault	Wait or contact server admin

     These status shows the our API or server work properly or not you can quickly identify the problem if your side server you can fix it like 404 its a client server problem means client may be give faulty input. 

Q4. What are HTTP headers? Name some important request and response headers?
Ans Headers are metadata that provide information about HTTP requests and responses
    Request headers tell the server about the client and what it wants
    Response headers tell the client about the response and how to handle it
    Common request headers: Host, User-Agent, Accept, Authorization, Content-Type
    Common response headers: Content-Type, Cache-Control, Set-Cookie, Location
    Headers enable: Content negotiation, authentication, caching, and security
    Every HTTP message has headers, and understanding them is essential for web development and troubleshooting
    Headers are the glue that makes HTTP communication work properly.

Q5. What is the difference between stateless and stateful protocols? Is HTTP stateless?
Ans A state in networking refers to information about a connection or session that is remembered. 
    The difference between stateless and stateful protocols is fundamentally about whether the server remembers things about you after you make a request.
​
    Stateless Protocol: A protocol where the server doesn't remember anything about previous requests from the client. Each request is treated as a completely new, independent transaction.
    it's follow the protocols like HTTP (Hyper Text Transfer Protocol it work on Application layer), UDP (User Datagram Protocol it's work on Transport layer in OSI Model or TCP/IP model), DNS (Domain Name System it's also work on Application layer It's work on convert domain name into IP Address)

    Stateful Protocol: A protocol where the server remembers information about previous requests and maintains session state across multiple interactions.
    It's follow the protocol TCP (Transmission control Protocol) which work on the Transport layer, FTP (File Transfer Protocol PORT nO. is 21) which work on Application Layer, TELNET (Telecommunication Network Port number is 23) which also work on Application layer

Q5. Explain idempotency in REST APIs. Which HTTP methods are idempotent?
Ans Idempotency is one of the most important concepts in API design. It refers to the property of an operation where making 
    multiple  identical requests produces the same result as making a single request. In other words, no matter how many times you send the same request, the server ends up in the same state.
​
    The term comes from mathematics and computer science, literally meaning "the quality of having the same power". A mathematical function f is idempotent if f(f(x)) = f(x)—applying it multiple times gives the same result as applying it once

    Idempotent example: Deleting a newsletter subscription. Whether you unsubscribe once or ten times, the result is the same—you're unsubscribed. The action doesn't have additional side effects on subsequent repetitions.
​
    Non-idempotent example: Placing a food order. If you submit the same order twice, you get TWO orders placed, not one. Each submission creates additional side effects.
​
    Idempotency vs Safety: Two Different Concepts
    It's important to understand that idempotency and safety are different properties:​

    GET: Safe AND idempotent (doesn't change state, and multiple GETs return same data)

    PUT: Idempotent but NOT safe (changes state, but repeated PUTs result in same final state)

    DELETE: Idempotent but NOT safe (changes state, but resource stays deleted on retry)

    POST: Neither safe NOR idempotent (changes state, and multiple POSTs create multiple resources)    

Q7. What is REST? What are the principles of RESTful API design?
Ans A REST API (or RESTful API) is a web service that allows clients to communicate with servers using HTTP methods to access 
    and manipulate resources. Resources are identified by URLs, and the operations are performed using standard HTTP methods like GET, POST, PUT, and DELETE.

Q8. How would you version a REST API? What are the different approaches?
Ans API versioning is the process of managing changes to an API while maintaining compatibility with existing clients.
     Without versioning, updating your API risks breaking applications that depend on it. Versioning allows you to introduce new features or make breaking changes while giving clients time to migrate.

