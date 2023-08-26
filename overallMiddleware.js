const fs = require("fs");


//Checking API Key for Authentication

const confirmAPI_Key = (req, res, next) => {
    const consumerData = fs.readFileSync("./stores/consumers.json");
    const consumerStores = JSON.parse(consumerData);
    
    const api_key = req.headers.apiKey;

    if (!api_key) {
        return res.status(401).json({
            message: "You are not registered and not authenticated"
        })
    }

    const confirmConsumer = consumerStores.find((consumer) => consumer.apiKey === api_key);

    if (!confirmConsumer) {
        return res.status(401).json({
            message: "You are not registered and not authenticated",
        });
    }

    next();
}


// Checking the role function of consumers

const confirmAdmin = (req, res, next) => {
    const consumerData = fs.readFileSync("./stores/consumers.json");
    const consumerStores = JSON.parse(consumerData);
    
    const api_key = req.headers.apiKey;

    const confirmConsumer = consumerStores.find(
        (consumer) => consumer.apiKey == api_key
    );

    if (confirmConsumer.roleType !== "admin") {
        return res.status(403).json({
            message: "You are not registered and not authenticated",
        });
    }

    next();
};


// Checking the acceptability of items

const confirmInventory = (req, res, next) => {
    const inventoryItems = ["Pants", "Bra", "Lingre"];

    if (inventoryItems.includes(req.body.name)) {
        return res.status(406).json({
            errorMessage: "Among list of Inventory items that are not acceptable"
        })
    }

    next();
}


module.exports = {
	confirmAPI_Key,
	confirmAdmin,
	confirmInventory,
};