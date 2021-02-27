const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');

const app = express();
const port = 5000;

mongoose.connect("mongodb+srv://apple:apple@cluster0.xl6iy.mongodb.net/library-management?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log('Connection Failed', err);
    });

//middlewares
app.use(bodyParser.json()); //convert the req body into the form of json
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

//request routes
app.use('/user', userRoutes);
app.use('/books', bookRoutes);

app.listen(port, () => {
    console.log("Server is started");
});