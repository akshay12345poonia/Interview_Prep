Q1. What is HTTPS? How does it differ from HTTP?
Ans. HTTP stands for Hyper Text Transfer Protocol. It's used for Transfer data between browser and server in plain text. It's not secure data
     can be intercepted Man in the middle attack. It's default Port is 80

     HTTPS is secure because HTTPS works over SSL/TLS encryption. Data is encrypted, ensuring privacy and intergrity. Prevents data tampering and
     Eavesdroping. It's default Port is 443. It's SEO And Trust is High


Q2. Explain SSL/TLS. What is the SSL handshake process?
Ans SSL stands for Secure Socket Layer and TLS stands for Transport Layer Security
    It's Cryptographic protocols to secure communication
    TLS is the modern and secure version of SSL

    SSL/TLS Handshake (simplified steps):
        1. Client Hello: Browser sends supported encryption algorithms.
        2. Server Hello: Server sends its SSL certificate
        3. Certificate verification: Browser verifies certificate via CA.
        4. Key Exchange: Client generate a session key, Encrypts it using server's public key
        5. Secure communication starts: Both use the session key (Symmetric encryption)
    After handshake, fast symmetric encryption is used

Q3. What is encryption? Explain symmetric vs asymmetric encryption.
Ans Process of Transfering information from readable to unreadable format.
    Encryption Algorithm are used to encrypt the information
    It means it's convert user text or plain text convert into cipher text
       Plain Text ---> Cipher Text or Vice Versa 

    Symmetric Cryptography: it is the simplest kind of Encryption Techniques that involves only 1 KEY encrypt and decrypt
    (or cipher and decipher information). It is also called secret key CRYPTOGRAPHY/ private key CRYPTOGRAPHY
    The most popular symmetric key cryptography system is DES(Data Encryption System). It's fast used after TLS handshake.
    Disadvantage: Sharing the key in b/w sender and reciever is not safe.

    Asymmetric Key: It is also called Public Key. It uses two Keys that is a pair of keys for encryption and decryption.
    it's safe this advantage but slow
    Public key --> known to Everyone.
    Private Key --> known only to that particular person
    A message this is encrypted using a public key can only be decrypted using a private key, while also,
    A message encrypted using private key can be decrypted using public key
    The most popular Assymetric key: RSA, DSA, Elliptic curve, etc..
    disadvantage: no problem of key sharing because of private key concept

Q4. What are certificates? What is a Certificate Authority (CA)?
Ans It's proves a website identity by domain name, public key, issued by CA, expiry date
    Certificaty Authority: Trusted Third Authority, verify website identity, issues certification 
    example: Digicert, Let's Encrypt, GlobalSign

Q5. What is the difference between authentication and authorization?
ans Authentication verifies a user's identity (who you are), like entering a password or using biometrics. Authorization determines 
    what that verified user can access or do, like granting file permissions based on roles. Authentication always precedes authorization.
    
Q6. Explain session-based authentication. How do sessions work?
Ans Session-based authentication is a stateful method where the server tracks logged-in users via sessions after initial login.
​    How it works (step-by-step):
    User submits credentials (e.g., username/password).
    Server verifies, creates a session (storing user data like ID in memory/DB), generates a unique session ID.
    Server sends session ID to client (usually as a cookie).
    Client includes cookie in future requests; server validates ID against stored session to authenticate.
    Relates to auth: Verifies identity post-login without re-entering 

Q7. What are cookies? What are the security attributes of cookies (HttpOnly, Secure, SameSite)?
Ans Cookies are persistent client-side storage mechanisms that allow servers to maintain state across stateless HTTP requests. 
    When a server creates a session, it sends the session ID embedded in a cookie header, which the browser stores and includes in all subsequent requests to that domain.

Q8. What is token-based authentication? How does it differ from session-based auth?
Ans Token-based authentication is a stateless method where the server issues a digitally signed token containing user information 
    that the client stores and sends with each request, eliminating the need for server-side session storage.
    How token-based authentication works (JWT flow):
    User submits credentials; server verifies them.
​    Server generates a JWT (JSON Web Token) containing user claims (ID, name, permissions) and signs it with a secret key.
​    Client stores the token (typically in HttpOnly cookies or secure storage).
    Client includes token in the Authorization: Bearer <token> header for subsequent requests.
    Server verifies the token's signature and claims; if valid, grants access without querying a database.
    JWT Structure: A JWT consists of three parts separated by dots: Header.Payload.Signature.​

    Header: Contains algorithm and token type (e.g., {"alg": "HS256", "typ": "JWT"}).
​
    Payload: Contains claims—user data like ID, email, permissions.
​
    Signature: Cryptographic hash ensuring the token hasn't been tampered with.

    Why tokens for APIs: Tokens eliminate database queries per request, making them faster and more scalable for RESTful APIs and distributed systems.
​    Hybrid approach (Refresh Tokens): Many apps use short-lived access tokens with longer-lived refresh tokens—if access token expires, 
    the client exchanges the refresh token for a new access token without re-logging in