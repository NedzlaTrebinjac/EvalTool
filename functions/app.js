const express = require('express');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const { response } = require('express');

const app = express();
const PORT = 4000;

// Creating 24h from milliseconds
const oneDay = 1000 * 60 * 24;

// Session middleware
app.use(sessions({
    secret:"thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: {maxAge: oneDay },
    resave: false
}));

// Parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving public file
app.use(express.static(__dirname));

// Cookie parser middleware
app.use(cookieParser());

//username and password
const myusername = 'user1';
const mypassword = 'password';

/**
 * There will be 3 routes: 
 * 1. http://localhost:4000
 */

app.get('/', (request,response) => {
    session = request.session;
    if(session.userid) {
        response.send("Welcome User <a href=\'/logout'>click to logout</a>");
    } else {
        response.sendFile('views/index.html',{root:__dirname})
    };
});

// 2. http://localhost:4000/user
app.post('/user', (request,response) => {
    if(request.body.username == myusername && request.body.password == mypassword) {
        session = request.session;
        session.userid = request.body.username;
        console.log(request.session)
        response.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    } else {
        response.send('Invalid username or password');
    }
});

//3. http://localhost:4000/logout
app.get('/logout', (request,response) => {
    request.session.destroy();
    response.redirect('/');
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));