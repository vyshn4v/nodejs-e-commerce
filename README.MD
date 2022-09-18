NODEJS E-COMMERCE APPLICATION

nodejs e-commerce application buying and seling goods and services ,admin can add/delete/update/ product and also control users ,users can buy product and add to cart

    the product is not completed yet

1.set up environmental variable

    mogoUrl= "mongodb url"

    hashSaltRounds = "salt for bcrypt"

    jwtSecretKey="enter secret key"

    googleAuthclientID= "google client id"

2.install all dependencies using

    npm i

3.start server using

    npm start or nodemon index.js

ROUTES-

1./authentication/register- register user with userName,Password,Email

body:

    {
        "username": "name",
        "email": "name@gmail.com",
        "password": "password!@#123"
    }
<!-- response:

    sucess

    {
        "status": true,
        "user":{
        "username": "name",
        "email": "name@gmail.com",
        "password": "$2b$10$Eg0ZYZc1H9HtAzoxPKXwCe. RmTRQZ2d9fyUfTe8rV60cck.WCzDQW",
        "isAdmin": false,
        "method": "email&password",
        "lastvisited": "2022-09-17T10:05:59.788Z",
        "_id": "63259c39f2c3568491e7b948",
        "createdAt": "2022-09-17T10:06:49.142Z",
        "updatedAt": "2022-09-17T10:06:49.142Z",
        "__v": 0,
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjU5YzM5ZjJjMzU2ODQ5MWU3Yjk0OCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjM0MDk1OTIsImV4cCI6MTY2MzY2ODc5Mn0.OIp3iO6aUNobydfam0Rxelrf68Tx_xHlrol7yVf030o"
    }}

    failed
    
    {
        "status": false,
        "message": "user already logged in"
    } -->

2./authentication/login-
    login user with Email ,Password

 body:

    {
        "email": "name@gmail.xom",
        "password": "12345!@#abcd"
    }
<!-- response:

    success

    {
    "status": true,
    "user": {
        "_id": "63259c39f2c3568491e7b948",
        "username": "name",
        "email": "name@gmail.com",
        "isAdmin": false,
        "method": "email&password",
        "lastvisited": "2022-09-17T10:05:59.788Z",
        "createdAt": "2022-09-17T10:06:49.142Z",
        "updatedAt": "2022-09-17T10:06:49.142Z",
        "__v": 0,
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjU5YzM5ZjJjMzU2ODQ5MWU3Yjk0OCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjM0MDk1OTIsImV4cCI6MTY2MzY2ODc5Mn0.OIp3iO6aUNobydfam0Rxelrf68Tx_xHlrol7yVf030o"
    }}

    failed

    {
        "status": false,
        "message": "enter valid password"
    } -->

3./authentication/signup-with-google-
    signin with google using google token id

body:

    {
        "token":"google token id"
    }

<!-- response

    sucess

    {
    status:true,
    user:{
        "googleId": "12345678910",
        "username": "name",
        "email": "name@gmail.com",
        "isAdmin": false,
        "method": "google",
        "lastvisited": "2022-09-17T10:21:01.231Z",
        "_id": "6325a0c7cb73c29b5af44d3e"
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjU5YzM5ZjJjMzU2ODQ5MWU3Yjk0OCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjM0MDk1OTIsImV4cCI6MTY2MzY2ODc5Mn0.OIp3iO6aUNobydfam0Rxelrf68Tx_xHlrol7yVf030o"
    }}

    failed

    {
        "status": false,
        "message": "User already logged in"
    } -->

4./authentication/login-with-google

 body:

    {
        "token":"google token id"
    }

 <!-- response:

    sucess

    {
    status:true,
    user:{
        "googleId": "12345678910",
        "username": "name",
        "email": "name@gmail.com",
        "isAdmin": false,
        "method": "google",
        "lastvisited": "2022-09-17T10:21:01.231Z",
        "_id": "6325a0c7cb73c29b5af44d3e"
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjU5YzM5ZjJjMzU2ODQ5MWU3Yjk0OCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjM0MDk1OTIsImV4cCI6MTY2MzY2ODc5Mn0.OIp3iO6aUNobydfam0Rxelrf68Tx_xHlrol7yVf030o"
    }}

    failed

    {
        "status": false,
        "err": "Token used too late"
    } -->

5./user/update/6318320e3c38a8d9ae2a3c66

    `add token in header`

body:

    {
        "email": "name@gmali.com"
    }

6./user/delete/6319b825fd55e78c9ef30b89

    add token in header to validate user

7./user/finduser/6319d0d33553af6e7caf738d

    add token in header to validate user

8./user/users

`find all users`

    add token in header to validate user
