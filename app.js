const express = require('express')
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const { json } = require('express');
const contactRouter = require('./router/contact-route');
require('./model/db');
require("dotenv").config();

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'));
app.use('/contact', contactRouter);
app.get('/', (req, res) => {
    res.send('contact manager');
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening port ${port}`);
});