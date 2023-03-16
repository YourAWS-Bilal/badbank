var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');

//MIDDLEWARE
const auth = require("./auth");

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// Constants
const PORT = 3000;
// const HOST = '0.0.0.0';

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    // else create user
    dal
        .create(req.params.name,req.params.email,req.params.password)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

// login user 
app.get('/account/login/:email/:password', function (req, res) {
    // find the account of user via email
    dal.findOne(req.params.email).
        then((user) => {
            // response is USER (encrypted pwd)
            bcrypt
                // plain === e-pwd
                .compare(req.params.password, user.password)
                .then((passwordCheck) => {
                    // double check password
                    if (!passwordCheck)
                        return res.status(400).send({
                            message: "Password does not match",
                            error,
                        });
                    const token = jwt.sign(
                        {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            balance: user.balance
                        },
                        "RANDOM-TOKEN",
                        { expiresIn: "24h" }
                    );
                    res.status(200).send({
                        message: "Login Successful",
                        email: user.email,
                        token,
                        // user
                    });
                })
                .catch((error) =>
                    res
                        .status(400)
                        .send({ message: "Password does not match", error})
                );
            console.log(user);

    });
    
});



// find one user by email
app.get('/account/findOne/:email', function (req, res) {
    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// Update balance
app.get('/account/updateBalance/:email/:balance', function (req, res) { 
    dal.updateBalance(req.params.email, req.params.balance)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});


// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});



var port = 3000;
app.listen(PORT, () => {
    console.log('Running on port: ' + port);
});
