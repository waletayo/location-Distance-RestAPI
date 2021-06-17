import express from "express";
import morgan from "morgan";
import routes from "../src/index"

const xss = require('xss-clean');

const cors = require('cors');

const helmet = require('helmet');

const rateLimit = require('express-rate-limit');

const app = express();

app.use(express.json());

app.use(morgan('dev'));


// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});

// Limit requests from same API
app.use('/api', limiter);

// Implement CORS
app.use(cors());
app.options('*', cors());

// Set security HTTP headers
app.use(helmet());

// Data sanitization against XSS
app.use(xss());

routes(app);
module.exports = app;
