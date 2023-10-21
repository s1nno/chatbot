
// created a discord bot using openai api that interacts with server
require('dotenv').config();

// conection to discord api
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

//conection to openai api
const { Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
    organization: process.env.APIORG,
    apiKey: process.env.APIKEY,
});

const openai = new OpenAIApi(configuration);

// check for when a message on discrod is sent
client.on('messageCreate', async function(message){
    try {
        // dont respond to yourself silly bot
        if(message.author.bot) return;
        console.log(message.content);
        message.reply('You said: ' + message.content);

    } catch(err) {
        console.log(err);
    }
});
// log the bot into discord
client.login(process.env.TOKEN);
console.log("chatbot is online");













require('dotenv').config();
const { Client, IntentsBitField} = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

bot.on('ready', () => {
    console.log('the bot is online!');
});

const configuration = new Configuration({
    apikey: process.env.APIKEY,
});
const openai = new OpenAIApi(configuration);


bot.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.channel.id !== process.env.CID) return;
    if (message.content.startsWith('!')) return;

    let conversationLog = [
        { role: 'system', content: 'You are a friendly chatbot'},
    ];

    conversationLog.push({
        role: 'user',
        content: message.content,
    });

    await message.channel.sendTyping();

    const result = await openai. createChatCompletion({
        model: 'gpt-3',
        messages: conversationLog,
    })

    message.reply(result.data.choices[0].message);

});


bot.login(process.env.TOKEN);