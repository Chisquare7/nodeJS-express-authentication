const express = require("express");
const middleware = require("./consumers.middleware")
const control = require("./consumers.controller")
const bodyParser = require("body-parser")


const consumersRouter = express.Router();

consumersRouter.use(bodyParser.json());
consumersRouter.post("/", middleware.checkConsumerEntry, control.createConsumer)


module.exports = consumersRouter