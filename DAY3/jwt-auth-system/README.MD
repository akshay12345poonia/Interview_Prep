
Q1. What is JWT (JSON Web Token)? Explain its structure (header, payload, signature)?
Ans JWT (JSON Web Token) is a compact and URL-safe token used to securely transfer information between a client and a server.
    It is mainly used for authentication and authorization in modern web applications. A JWT consists of three parts separated
    by dots. The header defines the type of token and the algorithm used for signing. The payload contains claims, which are
    user-related data such as user id, role, issued time, and expiration time. The signature is created using the encoded 
    header, encoded payload, and a secret key, and it ensures that the token has not been modified.

Q2. How does JWT authentication work? Explain the flow?
Ans2. JWT authentication works by first validating the user’s credentials during login. Once the credentials are verified, the
      server generates a JWT and sends it back to the client. The client stores this token and includes it in the Authorization
      header for every protected request. The server verifies the token on each request, and if the token is valid, access to the
      resource is granted. Since all required information is present in the token, the server does not need to store session data,
      making the process stateless.

Q3. What are the advantages and disadvantages of JWT over sessions?
Ans3 JWT has several advantages over traditional session-based authentication. It is stateless, which allows better scalability
     and makes it suitable for distributed systems and microservices. It reduces database lookups and works well with mobile 
     applications and APIs. However, JWT also has disadvantages. Tokens are difficult to revoke once issued, token size is larger
     compared to session IDs, and if a token is stolen, it can be misused until it expires. Proper expiration and refresh strategies
     are essential to mitigate these risks.

Q4. Where should you store JWTs in the client? (localStorage vs cookies vs memory)?
Ans4 JWTs can be stored on the client in different ways. Storing tokens in localStorage is simple but exposes them to XSS attacks.      Storing tokens in cookies with the HttpOnly flag prevents JavaScript access but introduces CSRF risks. Storing tokens in memory is the most secure approach but causes tokens to be lost on page refresh. A commonly recommended approach is to store access tokens in memory and refresh tokens in HttpOnly cookies.

Q5. What is the difference between access tokens and refresh tokens?
Ans5. Access tokens and refresh tokens serve different purposes. Access tokens are short-lived and are sent with every request to access protected APIs. Refresh tokens are long-lived and are used only to obtain new access tokens when the current one expires. This separation improves both security and user experience by reducing the need for frequent logins.

Q6. How do you handle JWT expiration and refresh?
Ans6 JWT expiration is handled by assigning a short lifespan to access tokens. When an access token expires, the client sends a refresh token to a refresh endpoint. If the refresh token is valid, the server issues a new access token. If the refresh token is also expired or invalid, the user is required to log in again. This mechanism ensures continuous authentication without compromising security.

Q7. What is Role-Based Access Control (RBAC)?
Ans7. Role-Based Access Control, or RBAC, is an authorization technique where access to resources is determined by user roles. Each role has predefined permissions, and users are assigned one or more roles. For example, an admin may have full access while a regular user has limited access. Roles are often stored in the JWT payload and used during authorization checks.

Q8. How would you implement authorization in an API?
Ans8. Authorization in an API is implemented by first authenticating the user using JWT. After authentication, the token is decoded to extract user information such as role or permissions. Middleware is then used to verify whether the user has the required access rights for a specific route. Based on this check, the request is either allowed or denied, ensuring secure and controlled access to API resources.
