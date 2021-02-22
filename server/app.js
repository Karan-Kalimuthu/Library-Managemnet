const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

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
app.use(bodyParser.json());

//requested routes
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log("Server is started");
});