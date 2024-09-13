# Task for WorkWise

## Hello, A quick note
Task is completed as was asked but currently, due to Smart India Hackathon which we are participating, I maybe not able to host this on AWS itself. I was working on our solution for SIH, but I don't want to lose this opportunity so I developed the backend and frontend. I have learned backend from my previous internship at a startup so I have followed all those practices which I was taught :)

So in short, **I have completed the task which was asked. You can Verify it.**

What I have used - 
1. bcrypt
2. bodyparser
3. cors
4. cryptojs
5. dotenv
6. express
7. expresswinston
8. jsonwebtoken
9. nodemon
10. pg
11. pghstore
12. sequelize
13. winston

What more I could have done - 
1. Can have used Redis for caching the Products GET Api.
2. Would have hosted it on AWS :)
3. Could have tried to dockerize it.

## Run them locally 
### 1. For Frontend
Install dependencies

```bash
  npm install 
```
```bash
  cd frontend
  npm run dev
```

 ### 2.  For backend 

Install dependencies

NOTE: You also need a ACCESS_SECRET_TOKEN for JWT

for that you can use node. (Node should be installed)

```
node
```

```
require('crypto').randomBytes(64).toString('hex')
```
Above will give you a string then insert it in .env as ACCESS_TOKEN_SECRET

 ```bash
  npm install
```
```bash
  cd backend
  nodemon server.js
```


### By Nishant Dixit


