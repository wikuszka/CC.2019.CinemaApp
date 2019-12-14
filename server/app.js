const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const homeRouter = require('./routes/home');
const connect = require('./db/connection');
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const movies = require("./routes/movies");
const shows = require("./routes/shows");
const mongoose = require('mongoose'); // to remove and implement in db connections

const main = async () => {
    const app = express();

    // Database configuration
    // await connect();
    //#####SECTION TO REMOVE AND IMPLEMENT IN DB CONNECTIONS ######
    mongoose.connect('mongodb://localhost/cinema') //conection to mongoDB; it returns a promise = .then is working
        .then(()=> console.log("Connected to MongoDB"))
        .catch(err => console.log('Could not connect to mongoDB...',err));
    // ###### TO REMOVE #######

    // Global middlewares
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({
        extended: false
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(morgan('dev'));

    // Routes
    app.use('/', homeRouter);
    app.use('/register', registerRouter);
    app.use('/login', loginRouter);
    app.use('/api/movies', movies);
    app.use('/api/shows', shows);



    // Listening
    const host = process.env.HOST || '127.0.0.1';
    const port = process.env.PORT || 8080;
    app.listen(port, host, () =>
        console.log(
            `Server is listening on http://${host}:${port}\n`,
        ),
    );
};

main();