# CORS & API Security

## What is CORS? Why does it exist?
CORS stands for Cross-Origin Resource Sharing. It is a browser security mechanism that controls how resources on a web server can be requested from a different origin. It exists to prevent malicious websites from making unauthorized requests to another website on behalf of a user, while still allowing safe and intentional cross-origin communication through explicit server-defined rules.

## Explain the Same-Origin Policy
The Same-Origin Policy is a fundamental browser security rule that restricts web pages from accessing data from another origin. An origin is defined by the combination of protocol, domain, and port. This policy prevents malicious scripts on one site from reading sensitive data from another site where the user may be authenticated.

## What are preflight requests? When do they occur?
A preflight request is an automatic HTTP OPTIONS request sent by the browser before the actual request. It occurs when the actual request is considered non-simple, such as when using methods like PUT or DELETE, custom headers, or sending JSON with certain content types. The browser checks whether the server allows the intended request before sending it.

## How do you configure CORS in Express?
In Express, CORS is configured using middleware. The server explicitly specifies which origins, methods, and headers are allowed. This is commonly done using the `cors` package or by manually setting response headers. Proper configuration ensures only trusted clients can access the API while blocking unauthorized origins.

## What is CSRF (Cross-Site Request Forgery)? How do you prevent it?
CSRF is an attack where a malicious website tricks a user’s browser into making an authenticated request to another site without the user’s knowledge. It is prevented by using CSRF tokens, setting SameSite cookie attributes, requiring custom headers for sensitive requests, and avoiding cookie-based authentication for public APIs.

## What is XSS (Cross-Site Scripting)? How do you prevent it?
XSS is a vulnerability where attackers inject malicious JavaScript into a web application, which then executes in other users’ browsers. It is prevented by properly escaping and sanitizing user input, using content security policies, avoiding dangerous HTML rendering methods, and validating all input and output data.

## What is SQL Injection? How do you prevent it?
SQL Injection is an attack where malicious SQL queries are injected through user input to manipulate or access a database illegally. It is prevented by using parameterized queries or prepared statements, avoiding string concatenation in queries, validating input, and using ORM or query builders that handle escaping automatically.

## What are rate limiting and throttling? Why are they important?
Rate limiting restricts the number of requests a client can make within a specific time window, while throttling slows down requests after a certain limit is reached. They are important to protect APIs from abuse, prevent denial-of-service attacks, and ensure fair usage and system stability.

## What is the principle of least privilege?
The principle of least privilege means granting users, services, or systems only the minimum level of access required to perform their tasks. This reduces the impact of security breaches by limiting what an attacker can access if a component is compromised.
