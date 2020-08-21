const express = require('express');
const mongoose = require('mongoose');
const mongoDB = require('./config/key').mongoURL;

const app = express();

app.use(express.json());

mongoose.connect(mongoDB, { useNewUrlParser: true })
    .then(() => console.log('Mongo DB connected...'))
    .catch(error => console.log(error));

const port = 5000;   // Server port 
app.listen(port, () => console.log(`Server running on ${port} ...`));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var customerRouter = require('./routes/customer')
app.use("/", customerRouter);