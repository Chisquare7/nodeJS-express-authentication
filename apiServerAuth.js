const express = require("express");

const inventoryRoute = require("./routes/inventory");
const consumersRoute = require("./consumers/consumers.router")

const server = express();
const portServer = 4000;

server.use("/inventory", inventoryRoute);
server.use("/users", consumersRoute);

server.listen(portServer, () => {
	console.log(`Server is running on port: ${portServer}`);
});
