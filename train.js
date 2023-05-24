const brain = require("brain.js"), data = require("./data"), { writeFileSync } = require("fs");

const network = new brain.recurrent.LSTM();

console.log("⏲️  Training model...");

const old = require("./model.json");

if (old.data != JSON.stringify(data)) {
    network.train(data, {
        log: (data) => console.log(`🤖 ${data}`)
    });

    const backup = network.toJSON();

    writeFileSync("./model.json", JSON.stringify({
        data: JSON.stringify(data),
        model: backup
    }));

    console.log("🚀 Model Ready!");
} else {
    console.log("🚀 Model Already Ready!");
}