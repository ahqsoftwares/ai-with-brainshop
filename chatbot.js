const responses = {
    data: "https://scratch-for-discord.com",
    fullform: "The full form is **scratch for discord**",
    and: "Androz",
    dif: "The https://scratch-for-discord.netlify.app is the original s4d but it is now outdated and suited for use. Also, that link I sent has a lot of features compared to the main one"
}

const { chatbot } = require("./config.json"), brain = require("brain.js"), data = require("./data"), { writeFileSync } = require("fs");

const network = new brain.recurrent.LSTM();

console.log("⏲️  Loading model...");

const old = require("./model.json");

network.fromJSON(old.model);

if (old.data != JSON.stringify(data)) {
    console.log(`⚠️  The NeuralNetwork is not up to date! Kindly refresh the data`);
} else {
    console.log("🚀 Model Ready!");
}

module.exports = async function predict(content, uid) {
    const data = responses[network.run(content)];

    if (data) {
        return data;
    }

    return await fetch(chatbot.replace("[uid]", uid).replace("[msg]", content)).then((data) => data.json()).then((data) => data.cnt).catch(() => null);
}