import express from "express";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan('dev'));
import routes from "../src/index"

routes(app)
module.exports = app;
