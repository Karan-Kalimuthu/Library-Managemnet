const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 5000;

mongoose.connect("mongodb+srv://apple:apple@cluster0.xl6iy.mongodb.net/library-management?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log('Connection Failed', err);
    });

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log("Server is started");
});