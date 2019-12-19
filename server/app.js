const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

/**** Configuration ****/
const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/books-site';

app.use(express.static(path.resolve('..', 'client', 'build')));
app.use(cors());
app.use(express.json()); // Used to parse JSON bodies
app.use(morgan('combined')); // Log all requests to the console

/**** Database access layers *****/
const bookDAL = require('./dal/book_dal')(mongoose);

/**** Start ****/
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        console.log("Database connected");
        await bookDAL.bootstrap();

        /**** Routes ****/
        const bookRouter = require('./routers/book_router')(bookDAL);
        app.use('/api/books', bookRouter);

        // "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html)
        // It's important to specify this route as the very last one to prevent overriding all of the other routes
        app.get('*', (req, res) =>
            res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
        );

        // When DB connection is ready, let's open the API
        await app.listen(PORT);
        console.log(`Books Site API running on port ${PORT}!`)
    })
    .catch(error => {
        console.error(error)
    });