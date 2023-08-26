const fs = require("fs");


// Create an Inventory Item

const createInventory = (req, res) => {
	const inventoryPathRead = fs.readFileSync("./stores/inventory.json");
	const inventoryItems = JSON.parse(inventoryPathRead);

	const itemsToCreate = req.body;

	const lastItemId = inventoryItems[inventoryItems.length - 1].id;
	const newItemId = lastItemId + 1;

	// const inventoryCreateId = { ...itemsToCreate, id: newItemId }

	inventoryItems.push({ ...itemsToCreate, id: newItemId });

	fs.writeFile(
		"./stores/inventory.json",
		JSON.stringify(inventoryItems),
		(error) => {
			if (error) {
				res.status(500);
			}
			res.status(200).json(itemsToCreate);
		}
	);
};



// Get All inventory Items

const getAllInventory = (req, res) => {
	const inventoryPathRead = fs.readFileSync("./stores/inventory.json");
	res.status(200).send(inventoryPathRead);
};



// Get One Inventory Item

const getOneInventory = (req, res) => {
    const inventoryPathRead = fs.readFileSync("./stores/inventory.json");
    const inventoryItems = JSON.parse(inventoryPathRead);

    const inventoryId = req.params.id
    const itemToFind = inventoryItems.find((item) => {
        return item.id == parseInt(inventoryId)
    })

    if (!itemToFind) {
        res.status(404).send("Inventory Item Not Found")
    }
    res.status(200).json(itemToFind)
};



// Update An Inventory Item

const updateInventory = (req, res) => {
    const inventoryPathRead = fs.readFileSync("./stores/inventory.json");
    const inventoryItems = JSON.parse(inventoryPathRead);

    const updateInventory = req.body

    const inventoryId = req.params.id;
    const itemToFind = inventoryItems.findIndex(item => item.id === parseInt(inventoryId))

    if (itemToFind == -1) {
        res.end("Inventory ID Not Found")
    }

    inventoryItems[itemToFind] = { ...inventoryItems[itemToFind], ...updateInventory }
	
    fs.writeFile("./stores/inventory.json", JSON.stringify(inventoryItems), (error) => {
        if (error) {
            res.status(500)
            res.end("Inventory update not successful")
        }
        res.json(inventoryItems[itemToFind])
    });
};



// Delete An Inventory item

const deleteInventory = (req, res) => {
    const inventoryPathRead = fs.readFileSync("./stores/inventory.json");
    const inventoryItems = JSON.parse(inventoryPathRead);

    const inventoryId = req.params.id;
    const itemToFind = inventoryItems.findIndex(
        (item) => item.id === parseInt(inventoryId)
    );

    if (itemToFind == -1) {
        res.status(500).send('Inventory Item Not Found')
        return
    } else {
        inventoryItems.splice(itemToFind, 1)
    }

    fs.writeFile(
        "./stores/inventory.json",
        JSON.stringify(inventoryItems),
        (error) => {
            if (error) {
                res.status(500);
                res.send("Internal Server Error");
            }
            res.status(200).send("Inventory Item successfully deleted");
        }
    );
};


module.exports = {
	createInventory,
	getAllInventory,
	getOneInventory,
	updateInventory,
	deleteInventory,
};