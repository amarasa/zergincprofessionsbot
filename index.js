//require('dotenv').config();
//const env = process.env;
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const path = require('path');

const PROFS_PREFIX = '.profs';
const ENCH_PREFIX = '.ench ';
const BS_PREFIX = '.bs ';
const JC_PREFIX = '.jc ';
const TAILOR_PREFIX = '.tailor ';
const ALCH_PREFIX = '.alch ';
const ENG_PREFIX = '.eng ';
const TEST_PREFIX = ".test";

client.once('ready', () => {
    console.log('Zerg Inc Professions Bot is Online!');
});

client.on('message', msg => {

    if ((msg.content).toLowerCase() === `${PROFS_PREFIX}`) {
        msg.channel.send('Zerg Inc Professions bot allows you to look up who can make what in the guild.\n\nFor enchanting, use **.ench [Enchant Name]**\nFor blacksmithing, use **.bs [Item Name]**\nFor enchanting, use **.jc [Gem Name]**\nFor enchanting, use **.tailor [Potion Name]**\nFor alchemy, use **.alch [Item Name]**\nFor engineering, use **.eng [Item Name]**\n\nFor example, to look up Mongoose, use .ench mongoose\n\nTo see specializations, use the term special after your prefix.\n\n For example, to see all alchemy specializations in the guild, run the command .alch special.\n\n\nTo submit your specialization or what you can make, send Lyles a message on discord to be added to the database.');
    }

    if (msg.content.startsWith(ENCH_PREFIX)) {
        const args = msg.content.slice(ENCH_PREFIX.length);
        const item = args.toLowerCase();
        switch(item) {
            case 'special':
                msg.channel.send('Enchanting does not have specializations.');
                break;
            case 'mongoose':
                msg.channel.send('https://tbc.wowhead.com/item=22559/formula-enchant-weapon-mongoose\n\nGuild Members with this enchant:\nNone');
                break;
            case 'major defense':
                msg.channel.send('https://tbc.wowhead.com/spell=27906/enchant-bracer-major-defense\n\nGuild Members with this enchant: \nLylès');
                break;
            default:
                msg.channel.send('Item not found');
        }
    }

    if (msg.content.startsWith(BS_PREFIX)) {
        const args = msg.content.slice(BS_PREFIX.length);
        const item = args.toLowerCase();
        console.log('item ' + item);

        switch(item) {
            case 'special':
                msg.channel.send('Axesmithing: None registered.\n\nSwordsmithing: None registered.\n\nHammersmithing: Lyles\nOrcbar\n\nArmorsmithing');
                break;
            case 'wildguard helm':
                msg.channel.send('https://tbc.wowhead.com/item=31392/plans-wildguard-helm\n\nPlayers that can craft this:\nLyles');
                break;
            case 'wildguard leggings':
            case 'wildguard legs':
                msg.channel.send('https://tbc.wowhead.com/spell=38475/wildguard-leggings\n\nPlayers that can craft this:\nLyles');
                break;
            case 'felsteel helm':
                msg.channel.send('https://tbc.wowhead.com/spell=29621/felsteel-helm\n\nPlayers that can craft this:\nLyles');
                break;
            case 'flamebane gloves':
                msg.channel.send('https://tbc.wowhead.com/search?q=flamebane+gloves\n\nPlayers that can craft this:\nLyles');
                break;
            case 'blessed bracers':
                msg.channel.send('https://tbc.wowhead.com/item=23539/blessed-bracers\n\nPlayers that can craft this:\nLyles');
                break;
            case 'bracers of the green fortress':
            case 'green fortress':
                msg.channel.send('https://tbc.wowhead.com/item=23538/bracers-of-the-green-fortress\n\nPlayers that can craft this:\nLyles');
                break;
            case 'gauntlets of the iron tower':
            case 'iron tower':
                msg.channel.send('https://tbc.wowhead.com/item=23532/gauntlets-of-the-iron-tower\n\nPlayers that can craft this:\nLyles');
                break;
            case 'helm of the stalwart defender':
            case 'stalwart defender':
                msg.channel.send('https://tbc.wowhead.com/item=23535/helm-of-the-stalwart-defender\n\nPlayers that can craft this:\nLyles');
                break;
            case 'flamebane bracers':
                msg.channel.send('https://tbc.wowhead.com/item=23515/flamebane-bracers\n\nPlayers that can craft this:\nLyles');
                break;
            default:
                msg.channel.send('Item not found');
        }
    }

    if (msg.content.startsWith(JC_PREFIX)) {
        const args = msg.content.slice(JC_PREFIX.length);
        const item = args.toLowerCase();
        switch(item) {
            case 'special':
                msg.channel.send('Jewelcrafting does not have specializations.');
                break;
                case 'lustrous star of elune':
                case 'lustrous':
                    msg.channel.send('https://tbc.wowhead.com/item=24037/lustrous-star-of-elune\n\nPlayers that can craft this:\nLylès');
                    break;
                case 'solid star of elune':
                case 'solid':
                    msg.channel.send('https://tbc.wowhead.com/item=24033/solid-star-of-elune\n\nPlayers that can craft this:\nLylès');
                    break;
                case 'sparkling star of elune':
                case 'sparkling':
                    msg.channel.send('https://tbc.wowhead.com/item=24035/sparkling-star-of-elune\n\nPlayers that can craft this:\nLylès');
                    break;
                case 'jagged talasite':
                case 'jagged':
                    msg.channel.send('https://tbc.wowhead.com/item=24067/jagged-talasite\n\nPlayers that can craft this:\nLylès');
                    break;     
                case 'radiant talasite':
                case 'radiant':
                    msg.channel.send('https://tbc.wowhead.com/item=24066/radiant-talasite\n\nPlayers that can craft this:\nLylès');
                    break;
                case 'chaotic skyfire diamond':
                case 'chaotic':
                    msg.channel.send('https://tbc.wowhead.com/spell=44794/chaotic-skyfire-diamond\n\nPlayers that can craft this:\nLylès');
                    break;      
                case 'enigmatic skyfire diamond':
                case 'enigmatic':
                    msg.channel.send('https://tbc.wowhead.com/item=25895/enigmatic-skyfire-diamond\n\nPlayers that can craft this:\nLylès');
                    break;      
                case 'insightful earthstorm diamond':
                case 'insightful':
                    msg.channel.send('https://tbc.wowhead.com/item=25901/insightful-earthstorm-diamond\n\nPlayers that can craft this:\nLylès');
                    break;
                case 'powerful earthstorm diamond':
                case 'powerful':
                    msg.channel.send('https://tbc.wowhead.com/item=25896/powerful-earthstorm-diamond\n\nPlayers that can craft this:\nLylès');
                    break;  
                case 'swift skyfire diamond':
                case 'swift':
                    msg.channel.send('https://tbc.wowhead.com/item=25894/swift-skyfire-diamond\n\nPlayers that can craft this:\nLylès');
                    break;  
                case 'tenacious earthstorm diamond':
                case 'tenacious':
                    msg.channel.send('https://tbc.wowhead.com/item=25898/tenacious-earthstorm-diamond\n\nPlayers that can craft this:\nLylès');
                    break;  
                case 'luminous noble topaz':
                case 'luminous':
                    msg.channel.send('https://tbc.wowhead.com/item=24060/luminous-noble-topaz\n\nPlayers that can craft this:\nLylès');
                    break; 
                case 'veiled noble topaz':
                case 'veiled':
                    msg.channel.send('https://tbc.wowhead.com/item=31867/veiled-noble-topaz\n\nPlayers that can craft this:\nLylès');
                    break;  
                case 'wicked noble topaz':
                case 'wickedz':
                    msg.channel.send('https://tbc.wowhead.com/item=31868/wicked-noble-topaz\n\nPlayers that can craft this:\nLylès');
                    break;
                case 'glowing nightseye':
                case 'glowing':
                    msg.channel.send('https://tbc.wowhead.com/item=24056/glowing-nightseye\n\nPlayers that can craft this:\nLylès');
                    break; 
                case 'royal nightseye':
                case 'royal':
                    msg.channel.send('https://tbc.wowhead.com/item=24057/royal-nightseye\n\nPlayers that can craft this:\nLylès');
                    break;
                case 'sovereign nightseye':
                case 'sovereign':
                    msg.channel.send('https://tbc.wowhead.com/item=24054/sovereign-nightseye\n\nPlayers that can craft this:\nLylès');
                    break;  
                case 'delicate living ruby':
                case 'delicate':
                    msg.channel.send('https://tbc.wowhead.com/item=24028/delicate-living-ruby\n\nPlayers that can craft this:\nLylès');
                    break;  
                case 'flashing living ruby':
                case 'flashing':
                    msg.channel.send('https://tbc.wowhead.com/spell=31091/flashing-living-ruby\n\nPlayers that can craft this:\nLylès');
                    break;
                case 'subtle living ruby':
                case 'subtle':
                    msg.channel.send('https://tbc.wowhead.com/item=24032/subtle-living-ruby\n\nPlayers that can craft this:\nLylès');
                    break;
                case 'great dawnstone':
                case 'great':
                    msg.channel.send('https://tbc.wowhead.com/item=31861/great-dawnstone\n\nPlayers that can craft this:\nLylès');
                    break;
                case 'mystic dawnstone':
                case 'mystic':
                    msg.channel.send('https://tbc.wowhead.com/item=24053/mystic-dawnstone\n\nPlayers that can craft this:\nLylès');
                    break;
                case 'rigid dawnstone':
                case 'rigid':
                    msg.channel.send('https://tbc.wowhead.com/item=24051/rigid-dawnstone\n\nPlayers that can craft this:\nLylès');
                    break;
                case 'thick dawnstone':
                case 'thick':
                    msg.channel.send('https://tbc.wowhead.com/item=24052/thick-dawnstone\n\nPlayers that can craft this:\nLylès');
                    break;
            default:
                msg.channel.send('Item not found');
        }
    }

    if (msg.content.startsWith(TAILOR_PREFIX)) {
        const args = msg.content.slice(TAILOR_PREFIX.length);
        const item = args.toLowerCase();
        switch(item) {
            case 'special':
                msg.channel.send('No specializations received yet.');
                break;
            default:
                msg.channel.send('Item not found');
        }
    }

    if (msg.content.startsWith(ALCH_PREFIX)) {
        const args = msg.content.slice(ALCH_PREFIX.length);
        const item = args.toLowerCase();
        switch(item) {
            case 'special':
                msg.channel.send('Elixir Master: Synderasis\n\nPotion Master: None Registered.\n\nTransmute Master: None registered\n');
                break;
            default:
                msg.channel.send('Item not found');
        }
    }

    if (msg.content.startsWith(ENG_PREFIX)) {
        const args = msg.content.slice(ENG_PREFIX.length);
        const item = args.toLowerCase();
        switch(item) {
            case 'special':
                msg.channel.send('No specializations received yet.');
                break;
            default:
                msg.channel.send('Item not found');
        }
    }

//-- Testing
    if ((msg.content).toLowerCase() === `${TEST_PREFIX}`) {
        console.log('test started');
        let rawdata = fs.readFileSync(path.resolve(__dirname, 'data.json'));
        let zergData = JSON.parse(rawdata);
        console.log(zergData.Professions.Alchemy['Super Mana Potion'].wowhead);
    }
});

client.login('ODYwNDk3ODkzNTA5MDM4MTAw.YN8HHQ.rz3cNHY0QVO8TIg0-muapygZbGs');