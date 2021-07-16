require('dotenv').config();
const axios = require('axios')
const env = process.env;
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const path = require('path');

// const PROFS_PREFIX = '.profs';
// const ENCH_PREFIX = '.ench ';
// const BS_PREFIX = '.bs ';
// const JC_PREFIX = '.jc ';
// const TAILOR_PREFIX = '.tailor ';
// const ALCH_PREFIX = '.alch ';
// const ENG_PREFIX = '.eng ';
const CRAFT_PREFIX = '.craft ';
const PLAYER_PREFIX = '.player ';
const HELP_PREFIX = '.help';

const MAINT_MODE = false;

const rawdata = fs.readFileSync(path.resolve(__dirname, 'data.json'));
const zergData = JSON.parse(rawdata);

client.once('ready', () => {
    console.log('Zerg Inc Professions Bot is Online!');
    msg.channel.send(':wave: I\'m back online and better than ever! To see my new commands, use the .help command.');
});

client.on('message', msg => {


    if (msg.content.startsWith(CRAFT_PREFIX)) {
        const args = msg.content.slice(CRAFT_PREFIX.length);
        console.log(args);
        axios.get(env.DOMAIN+'?craft='+args)
            .then(function (response) {
                msg.channel.send("Hey! I've found **" + response.data.results + '** results for: **' + response.data.search_term + '**'+'\n\n~~\u200B     \u200B~~');
                response.data.data.forEach(data => {
                    let chatResponse = "**Profession:** " + data.profession + "\n**Name:** " + data.name +"\n**On Wowhead:** <"+data.wowhead+">" + "\n**Effect:** " + data.effect;
                    let crafters = '';
                    if (data.socket) {
                        chatResponse += "\n**Socket:** " + data.socket;
                    }

                    if (data.type) {
                        chatResponse += "\n**Specialty Type:** " + data.type;
                    }


                    data.players.forEach(player => {
                        crafters += player.name + ', ';
                    });


                    chatResponse += "\n**Materials required:** " + data.materials
                    if (crafters == '') {
                        crafters = 'Sorry, nobody in Zerg Inc can do this. Can you? Or know who can? Let us know!'
                    }
                    crafters = crafters.replace(/,\s*$/, "");
                    chatResponse += "\n**Who can do this:** " + crafters + "\n\n~~\u200B     \u200B~~"

                    msg.channel.send(chatResponse);
                   
                });

                msg.channel.send('Alright <@' + msg.author.id + '>! That\'s all I was able to find. :sweat_smile:');
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    if (msg.content.startsWith(PLAYER_PREFIX)) {
        const args = msg.content.slice(PLAYER_PREFIX.length);
        console.log(args);
        axios.get(env.DOMAIN+'?player='+args)
            .then(function (response) {
                let term = '';
                if ( response.data.results == 1) {
                    term = 'result'; 
                } else {
                    term = 'results';
                }
                if (response.data.results == 0) {
                    msg.channel.send('Sorry, <@' + msg.author.id + '>, We don\'t have anyone in Zerg Inc with that name.');
                } else {
                    msg.channel.send('Hang tight <@' + msg.author.id + '>, I\'ll find ' + response.data.player_search +' for you. \n\nAlright, I found **' + response.data.results + '** ' + term);
                }

                response.data.data.forEach(data => {
                    chatResponse = '**Player:** ' + data.name;
                    let chatSpecialty = '';
                    let chatRecipes = '';

                    data.specialty.forEach(specialty => {
                        chatSpecialty += specialty.niceName + ', '
                    });
                    
                    if (chatSpecialty == '') {
                        chatSpecialty = 'No specializations on record.';
                    }
            
                    data.recipes.forEach(recipe => {
                        chatRecipes += recipe.name + ', '
                    });
                    
                    if (chatRecipes == '') {
                        chatRecipes = 'No recipes on record.';
                    }

                    chatSpecialty = chatSpecialty.replace(/,\s*$/, "");
                    chatRecipes = chatRecipes.replace(/,\s*$/, "");

                    chatResponse += '\n**Specialization: **' + chatSpecialty
                    chatResponse += '\n**Has: **' + chatRecipes
                    chatResponse += '\n\n~~\u200B     \u200B~~'
                    msg.channel.send(chatResponse);
            
                });
                msg.channel.send('Alright <@' + msg.author.id + '>! That\'s all I was able to find. :muscle:');

            })
            .catch(function (error) {
                // handle error
                console.log(error.message);
                console.log('error');
            })
    }

    if (msg.content.startsWith(HELP_PREFIX)) {
        msg.channel.send('Use **.craft** followed by a search term. This can be anything from an exact recipe name, to a partial recipe name or even certain stats. If you want to see what gems contain stamina for example, you can say: .craft stamina.\n\nUse: **.player** followed by a player name to get all craftables by that player.\n\nIf you have a craft that isn\'t listed, reach out to an officer for help on getting it listed.');
    }
//646577019013824512 - officer role ID
    if (MAINT_MODE == true) {
        if (msg.content.startsWith(PROFS_PREFIX) ||
        msg.content.startsWith(ENCH_PREFIX)||
        msg.content.startsWith(BS_PREFIX)||
        msg.content.startsWith(JC_PREFIX)||
        msg.content.startsWith(TAILOR_PREFIX)||
        msg.content.startsWith(ALCH_PREFIX)||
        msg.content.startsWith(ENG_PREFIX)) {

            msg.channel.send("I'm currently under maintenance mode and temporarily disabled. Please try again soon.");
        }
    } 
});

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

client.login(env.BOT_TOKEN);