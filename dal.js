// const MongoClient = require('mongodb').MongoClient;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //Bcrypt

const uri = "mongodb+srv://somebody:2VC1iiLTtdJvrowE@cluster0.g99bnpy.mongodb.net/badbank?retryWrites=true&w=majority";

const dbName = "badbank";

const connectionParams = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'badbank'
});

// const collection = mongoose.connection.db.collection('customers');
// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = connectionParams.db.collection('customers');

        // plain pwd
        bcrypt
            .hash(password, 10)
            // encrypted pwd
            .then((password) => {
                const doc = { name, email, password, balance: 0 };
                collection.insertOne(doc, { w: 1 }, function (err, result) {
                    err ? reject(err) : resolve(doc);
                });
            })
            .catch((error) => {
                res.status(500).send({
                    message: "Password was not hashed successfully",
                    error,
                });
            });    
    })
}

// find user account 
function find(email) {
    return new Promise((resolve, reject) => {
        const collection = connectionParams.db.collection('customers')
            .find({ email: email })
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    });
}

// find user account
function findOne(email) {
    return new Promise((resolve, reject) => {
        const collection = connectionParams.db.collection('customers')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
}

//udate account balance
function updateBalance(email, balance) {
    return new Promise((resolve, reject) => {
        const collection = connectionParams.db.collection('customers')
            .updateOne(
                { email: email },
                [
                    { $set: { balance: +balance} }
                ]
            )
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    });
}


// all users
function all(){
    return new Promise((resolve, reject) => {    
        const collection = connectionParams.db.collection('customers')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    });
}
module.exports = {create, find, findOne, all, updateBalance};