const express = require("express");
const cors = require("cors");
const { connectWithMongoClient, connectWithMongoose } = require("./mongodb");
const router = require("./router/index");

const app = express();
const port = 5000;

app.use(cors({
    origin: "*",
    credentials: true
}));

connectWithMongoose();

app.use(express.json());

app.use("/api", router);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
