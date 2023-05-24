const chatbot = require("./chatbot.js");

const { Client } = require('eris.v2');
const { token } = require('./config.json');

const client = new Client(token, {
    intents: [
        "all"
    ],
});

client.connect();

client.on("ready", () => {
    console.log(`🚀 Ready as ${client.user.username}`);
});

client.on("messageCreate", async (message) => {
    if (message.channel.id == "1110137323896721438" && !message.author.bot) {
        const data = await chatbot(message.content, message.author.id);
        
        message.channel.createMessage({
            content: data || "I didn't got that!",
            messageReference: {
                messageID: message.id
            },
        });
    }
});