/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://root:asepassword@ds153730.mlab.com:53730/aselab10';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
})
app.post('/login', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        login(db, req.body, function() {
            res.write("Login successful");
            res.end();
        });
    })
    var login = function(db, data, callback) {
        var cursor =db.collection('users').find({'email': data.email});
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                if (doc.password == data.password) {
                    //res.redirect('details');
                    res.status(200);
                    //res.end();
                }
                else {
                    res.status(400);
                    //res.write("Incorrect password");
                    //res.end();
                }
            } else {
                callback();
            }
        });
    };
})
var insertDocument = function(db, data, callback) {
    db.collection('users').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the users collection.");
        callback();
    });
};


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})