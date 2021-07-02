//require('dotenv').config();
//const env = process.env;
const Discord = require('discord.js');
const client = new Discord.Client();

const PROFS_PREFIX = '.profs';
const ENCH_PREFIX = '.ench ';
const BS_PREFIX = '.bs ';
const JC_PREFIX = '.jc ';
const TAILOR_PREFIX = '.tailor ';
const ALCH_PREFIX = '.alch ';
const ENG_PROFIX = '.eng ';

client.once('ready', () => {
    console.log('Zerg Inc Professions Bot is Online!');
});

client.on('message', msg => {

    if ((msg.content).toLowerCase() === `${PROFS_PREFIX}`) {
        msg.channel.send('Zerg Inc Professions bot allows you to look up who can make what in the guild.\n\nFor enchanting, use **.ench [Enchant Name]**\nFor blacksmithing, use **.bs [Item Name]**\nFor enchanting, use **.jc [Gem Name]**\nFor enchanting, use **.tailor [Potion Name]**\nFor alchemy, use **.alch [Item Name]**\nFor engineering, use **.eng [Item Name]**\n\nFor example, to look up Mongoose, use .ench mongoose\n\nTo see specializations, use the term special after your prefix.\n\n For example, to see all alchemy specializations in the guild, run the command .alch special.\n\n\nTo submit your specialization or what you can make, send Lyles a message on discord to be added to the database.');
    }

    if (msg.content.startsWith(ENCH_PREFIX)) {
        const args = msg.content.slice(ENCH_PREFIX.length).trim().split(/ +/);
        const item = args.shift().toLowerCase();
        switch(item) {
            case 'mongoose':
                msg.channel.send('https://tbc.wowhead.com/item=22559/formula-enchant-weapon-mongoose\n\nGuild Members with this enchant:\nNone');
                break;
            case 'special':
                msg.channel.send('Enchanting does not have specializations.');
                break;
            default:
                msg.channel.send('Item not found');
        }
    }

    if (msg.content.startsWith(BS_PREFIX)) {
        const args = msg.content.slice(ENCH_PREFIX.length).trim().split(/ +/);
        const item = args.shift().toLowerCase();
        switch(item) {
            case 'special':
                msg.channel.send('No specializations received yet.');
                break;
            case 'wildguard helm':
                msg.channel.send('https://tbc.wowhead.com/item=31392/plans-wildguard-helm/n/nPlayers that can craft this:\nLyles');
                break;
            default:
                msg.channel.send('Item not found');
        }
    }

    if (msg.content.startsWith(JC_PREFIX)) {
        const args = msg.content.slice(ENCH_PREFIX.length).trim().split(/ +/);
        const item = args.shift().toLowerCase();
        switch(item) {
            case 'special':
                msg.channel.send('Jewelcrafting does not have specializations.');
                break;
            default:
                msg.channel.send('Item not found');
        }
    }

    if (msg.content.startsWith(TAILOR_PREFIX)) {
        const args = msg.content.slice(ENCH_PREFIX.length).trim().split(/ +/);
        const item = args.shift().toLowerCase();
        switch(item) {
            case 'special':
                msg.channel.send('No specializations received yet.');
                break;
            default:
                msg.channel.send('Item not found');
        }
    }

    if (msg.content.startsWith(ALCH_PREFIX)) {
        const args = msg.content.slice(ENCH_PREFIX.length).trim().split(/ +/);
        const item = args.shift().toLowerCase();
        switch(item) {
            case 'special':
                msg.channel.send('No specializations received yet.');
                break;
            default:
                msg.channel.send('Item not found');
        }
    }

    if (msg.content.startsWith(ENG_PROFIX)) {
        const args = msg.content.slice(ENCH_PREFIX.length).trim().split(/ +/);
        const item = args.shift().toLowerCase();
        switch(item) {
            case 'special':
                msg.channel.send('No specializations received yet.');
                break;
            default:
                msg.channel.send('Item not found');
        }
    }
});

client.login('ODYwNDk3ODkzNTA5MDM4MTAw.YN8HHQ.rz3cNHY0QVO8TIg0-muapygZbGs');