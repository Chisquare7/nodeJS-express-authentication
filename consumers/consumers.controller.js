const fs = require("fs");

const createConsumer = (req, res) => {
    const consumerData = fs.readFileSync("./stores/consumers.json");
    const consumerStores = JSON.parse(consumerData)

    const newConsumer = req.body
    newConsumer.apiKey = `${newConsumer.consumerName}_${newConsumer.password}`

    if (newConsumer.consumerName === "Chibuike") {
        newConsumer.roleType = "admin"
    }
    else { newConsumer.roleType = "user" }
    
    consumerStores.push(newConsumer);

    fs.writeFile("./stores/consumers.json", JSON.stringify(consumerStores), (error) => {
        if (error) {
            res.status(500).json({
                message: "Ooops! Internal Server Error"
            })
        }
        res.status(200).json(newConsumer)
    })
}

module.exports = {createConsumer}