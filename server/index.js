//add the required modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const {v4: uuidv4} = require('uuid');
const {check,validationResult} = require('express-validator');

// creating an instance of express
const app = express();
const loginService = require('./services/loginService');
const registerService = require('./services/registerService');
const userData = require('./data/users');

const PORT = process.env.PORT || 5000

// Middleware
app.use(cors());
app.use(express.json());
//session
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    }
}))

app.use(express.urlencoded({extended: true}));
//set ejs view
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

//routes
app.use(express.static(path.join(__dirname, "../client"), {
    dotfiles: "ignore",
    extensions: ["html", "htm"]
}));

//dashborad route
app.get('/dashboard', (req, res) => {
    if (req.session.isValid) {
        res.render('dashboard', {
            emailWarning: "",
            passwordWarning: ""
        })
    } else {
        res.render('login', {
            emailWarning: "",
            passwordWarning: ""
        })
    }

})

//register
app.get('/register', (req, res) => {
    res.render('register', {
        nameError: "",
        emailError: "",
        passwordError: ""
    })

});

//users
app.get('/users', (req, res) => {
    res.render('users');
})
//login
app.get('/login', (req, res) => {
    res.render('login', {
        emailWarning: "",
        passwordWarning: "",
        email: "",
        password: ""
    })
});

//login form
app.post('/login', (req, res) => {
    console.log(req.body);
    // res.send("trying to login");
    const credentials = {
        email: req.body.email,
        password: req.body.password
    }
    const isValidUser = loginService.authenticate(credentials)
    if (isValidUser.user !== null) {
        if (!req.session.isValid) {
            req.session.isValid = true;
        }
        res.redirect('dashboard');
    }

    if (isValidUser.user === null) {
        res.render('login', {
            emailWarning: isValidUser.emailWarning,
            passwordWarning: isValidUser.passwordWarning,
            email: req.body.email,
            password: req.body.password
        })
    }
})

// registration form
app.post('/register', [
    check('username')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
    check('email', 'Email is required')
    .isEmail(),
    check('password', 'Password is required')
], (req, res) => {

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        console.log('else condition');
        const credentials = {
            userid: uuidv4(),
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        req.session.success = true;

        const userData = registerService.writeFile(credentials);
        res.redirect('login');
    }
    if (!errors.isEmpty()) {
        extractedErrors = [];
        res.render('register', {
            errors: errors.array().map(err => extractedErrors.push(err.msg)),
            nameError: "Username is required",
            emailError: "Valid email is required",
            passwordError: "Password is required"
        })
        console.log("extractedErrors = " + extractedErrors)
    }
})

//get users from json
app.get('/api/users', (req, res) => {
    res.json(userData);
})

// if file not found
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
});

// server listening to the port
app.listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}`)
})