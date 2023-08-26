const bodyParser = require("body-parser");
const express = require("express");

const overallController = require("../overallController");
const overallMiddleware = require("../overallMiddleware");


const inventoryRouter = express.Router();

inventoryRouter.use(bodyParser.json());

inventoryRouter.get("/", overallMiddleware.confirmAPI_Key, overallController.getAllInventory)
inventoryRouter.get("/:id", overallMiddleware.confirmAPI_Key, overallController.getOneInventory)
inventoryRouter.post("/", overallMiddleware.confirmAPI_Key, overallMiddleware.confirmAdmin, overallMiddleware.confirmInventory, overallController.createInventory)
inventoryRouter.put("/:id", overallMiddleware.confirmAPI_Key, overallMiddleware.confirmAdmin, overallController.updateInventory)
inventoryRouter.delete("/:id", overallMiddleware.confirmAPI_Key, overallMiddleware.confirmAdmin, overallController.deleteInventory)



module.exports = inventoryRouter

