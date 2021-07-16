require('dotenv').config();
const axios = require('axios')
const env = process.env;
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
const CRAFT_PREFIX = '.craft ';
const PLAYER_PREFIX = '.player ';

const MAINT_MODE = false;

const rawdata = fs.readFileSync(path.resolve(__dirname, 'data.json'));
const zergData = JSON.parse(rawdata);

client.once('ready', () => {
    console.log('Zerg Inc Professions Bot is Online!');
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
} else {


    if ((msg.content).toLowerCase() === `${PROFS_PREFIX}`) {
        msg.channel.send('Zerg Inc Professions bot allows you to look up who can make what in the guild.\n\nFor enchanting, use **.ench [Enchant Name]**\nFor blacksmithing, use **.bs [Item Name]**\nFor enchanting, use **.jc [Gem Name]**\nFor enchanting, use **.tailor [Potion Name]**\nFor alchemy, use **.alch [Item Name]**\nFor engineering, use **.eng [Item Name]**\n\nFor example, to look up Mongoose, use .ench enchant weapon - mongoose\n\n\nTo submit your what you can make, send Lyles a message on discord to be added to the database.');
    }

    if (msg.content.startsWith(ENCH_PREFIX)) {
        const args = msg.content.slice(ENCH_PREFIX.length);
        const item = args.toLowerCase();
        console.log(item);

        //-- Check to see if the item even exists in our JSON file
        if(item in zergData.professions.enchanting){
            //-- Initiat an empty local varable that will contain the crafter's names
            let crafters = '';

            //-- Display wowhead link
            msg.channel.send("<"+zergData.professions.enchanting[item].wowhead+">");

            //-- Get the players who can craft this recipe from the JSON array and assign it to a local var
            zergData.professions.enchanting[item].players.forEach(player => {
                //-- Check to see if the local crafters variable is empty, so I know whether to add a comma or not
                if (crafters.length == 0) {
                    crafters = player;
                } else {
                    crafters = crafters + ', ' + player;
                }
            }); 

            //-- Display the enchant details
            msg.channel.send("**Effect:** " + zergData.professions.enchanting[item].effect);

            //-- Display the materials required
            msg.channel.send("**Materials required:** " + zergData.professions.enchanting[item].mats +"\n\n");

            //-- Display who can has this recipe
            msg.channel.send('**Enchanters:** '+ crafters);
         } else {
             msg.channel.send('Sorry, the item you\'re looking for is not found. Please make sure you\'re using the item name and not the full recipe name.');
         }
    }

    if (msg.content.startsWith(BS_PREFIX)) {
        const args = msg.content.slice(BS_PREFIX.length);
        const item = args.toLowerCase();
        console.log(item);

        let rawdata = fs.readFileSync(path.resolve(__dirname, 'data.json'));
        let zergData = JSON.parse(rawdata);

        //-- Check to see if the item even exists in our JSON file
        if(item in zergData.professions.blacksmithing){
            //-- Get craftable type so that we can match it to a specialization
            let craftType = zergData.professions.blacksmithing[item].type;
            console.log(craftType);

            //-- Initiat an empty local varable that will contain the crafter's names
            let crafters = '';

            //-- Display wowhead link
            msg.channel.send("<"+zergData.professions.blacksmithing[item].wowhead+">");

            //-- Get the players who can craft this recipe from the JSON array and assign it to a local var
            zergData.professions.blacksmithing[item].players.forEach(player => {
                //-- Check to see if the local crafters variable is empty, so I know whether to add a comma or not
                if (crafters.length == 0) {
                    crafters = player;
                } else {
                    crafters = crafters + ', ' + player;
                }
            }); 
            //-- Display the materials required
            msg.channel.send("**Materials required:** " + zergData.professions.blacksmithing[item].mats +"\n\n");

            //-- Display who can has this recipe
            msg.channel.send('**Blacksmiths:** '+ crafters);

            //-- Get players that have the specialization in this consumable
            if (craftType != "None" && zergData.specialization.blacksmithing[craftType].length > 0) {
                //-- Initiat an empty local varable that will contain the specialized crafter's names
                let specializedCrafters = '';
                
                //-- Get the players who can specializa in this type from the JSON array and assign it to a local var
                zergData.specialization.blacksmithing[craftType].forEach(player => {
                     //-- Check to see if the local crafters variable is empty, so I know whether to add a comma or not
                    if (specializedCrafters.length == 0) {
                        specializedCrafters = player;
                    } else {
                        specializedCrafters = specializedCrafters + ', ' + player;
                    }
                });

                msg.channel.send('**Players with '+ capitalizeFirstLetter(craftType) + ' Specialization:** ' + specializedCrafters);
            }
         } else {
             msg.channel.send('Sorry, the item you\'re looking for is not found. Please make sure you\'re using the item name and not the full recipe name.');
         }
    }

    if (msg.content.startsWith(JC_PREFIX)) {
        const args = msg.content.slice(JC_PREFIX.length);
        const item = args.toLowerCase();
        console.log(item);

        let rawdata = fs.readFileSync(path.resolve(__dirname, 'data.json'));
        let zergData = JSON.parse(rawdata);

        //-- Check to see if the item even exists in our JSON file
        if(item in zergData.professions.jewelcrafting){
            //-- Initiat an empty local varable that will contain the crafter's names
            let crafters = '';

            //-- Display wowhead link
            msg.channel.send("<"+zergData.professions.jewelcrafting[item].wowhead+">");

            //-- Get the players who can craft this recipe from the JSON array and assign it to a local var
            zergData.professions.jewelcrafting[item].players.forEach(player => {
                //-- Check to see if the local crafters variable is empty, so I know whether to add a comma or not
                if (crafters.length == 0) {
                    crafters = player;
                } else {
                    crafters = crafters + ', ' + player;
                }
            }); 

            //-- Display the enchant details
            msg.channel.send("**Effect:** " + zergData.professions.jewelcrafting[item].effect);

            //-- Display the materials required
            msg.channel.send("**Materials required:** " + zergData.professions.jewelcrafting[item].mats +"\n\n");

            //-- Display the socket that this fits
            msg.channel.send("**Socket:** " + zergData.professions.jewelcrafting[item].socket +"\n\n");

            //-- Display who can has this recipe
            msg.channel.send('**Jewelcrafters:** '+ crafters);
         } else {
             msg.channel.send('Sorry, the item you\'re looking for is not found. Please make sure you\'re using the item name and not the full recipe name.');
         }
    }

    if (msg.content.startsWith(TAILOR_PREFIX)) {
        const args = msg.content.slice(TAILOR_PREFIX.length);
        const item = args.toLowerCase();

        let rawdata = fs.readFileSync(path.resolve(__dirname, 'data.json'));
        let zergData = JSON.parse(rawdata);

        //-- Check to see if the item even exists in our JSON file
        if(item in zergData.professions.tailoring){
            //-- Initiat an empty local varable that will contain the crafter's names
            let crafters = '';

            //-- Get craftable type so that we can match it to a specialization
            let craftType = zergData.professions.tailoring[item].type;

            //-- Display wowhead link
            msg.channel.send("<"+zergData.professions.tailoring[item].wowhead+">");

            //-- Get the players who can craft this recipe from the JSON array and assign it to a local var
            zergData.professions.tailoring[item].players.forEach(player => {
                //-- Check to see if the local crafters variable is empty, so I know whether to add a comma or not
                if (crafters.length == 0) {
                    crafters = player;
                } else {
                    crafters = crafters + ', ' + player;
                }
            }); 

            //-- Display the materials required
            msg.channel.send("**Materials required:** " + zergData.professions.tailoring[item].mats +"\n\n");

            //-- Display who can has this recipe
            msg.channel.send('**Tailors**: '+ crafters);
            //-- Get players that have the specialization in this profression
            if (craftType != "None" && zergData.specialization.tailoring[craftType].length > 0) {
                //-- Initiat an empty local varable that will contain the specialized crafter's names
                let specializedCrafters = '';
                
                //-- Get the players who can specializa in this type from the JSON array and assign it to a local var
                zergData.specialization.tailoring[craftType].forEach(player => {
                     //-- Check to see if the local crafters variable is empty, so I know whether to add a comma or not
                    if (specializedCrafters.length == 0) {
                        specializedCrafters = player;
                    } else {
                        specializedCrafters = specializedCrafters + ', ' + player;
                    }
                });

                msg.channel.send('**Players with '+ capitalizeFirstLetter(craftType) + ' Specialization:** ' + specializedCrafters);
            }

         } else {
             msg.channel.send('Sorry, the item you\'re looking for is not found. Please make sure you\'re using the item name and not the full recipe name.');
         }
    }

    if (msg.content.startsWith(ALCH_PREFIX)) {
        const args = msg.content.slice(ALCH_PREFIX.length);
        const item = args.toLowerCase();

        let rawdata = fs.readFileSync(path.resolve(__dirname, 'data.json'));
        let zergData = JSON.parse(rawdata);

        //-- Check to see if the item even exists in our JSON file
        if(item in zergData.professions.alchemy){
            //-- Initiat an empty local varable that will contain the crafter's names
            let crafters = '';

            //-- Get craftable type so that we can match it to a specialization
            let craftType = zergData.professions.alchemy[item].type;

            //-- Display wowhead link
            msg.channel.send("<"+zergData.professions.alchemy[item].wowhead+">");

            //-- Get the players who can craft this recipe from the JSON array and assign it to a local var
            zergData.professions.alchemy[item].players.forEach(player => {
                //-- Check to see if the local crafters variable is empty, so I know whether to add a comma or not
                if (crafters.length == 0) {
                    crafters = player;
                } else {
                    crafters = crafters + ', ' + player;
                }
            }); 

            //-- Display the enchant details
            msg.channel.send("**Effect:** " + zergData.professions.alchemy[item].effect);

            //-- Display the materials required
            msg.channel.send("**Materials required:** " + zergData.professions.alchemy[item].mats +"\n\n");

            //-- Display who can has this recipe
            msg.channel.send('**Alchemists**: '+ crafters);

            //-- Get players that have the specialization in this consumable
            if (zergData.specialization.alchemy[craftType].length > 0) {
                //-- Initiat an empty local varable that will contain the specialized crafter's names
                let specializedCrafters = '';
                
                //-- Get the players who can specializa in this type from the JSON array and assign it to a local var
                zergData.specialization.alchemy[craftType].forEach(player => {
                     //-- Check to see if the local crafters variable is empty, so I know whether to add a comma or not
                    if (specializedCrafters.length == 0) {
                        specializedCrafters = player;
                    } else {
                        specializedCrafters = specializedCrafters + ', ' + player;
                    }
                });

                msg.channel.send('**Players with '+ capitalizeFirstLetter(craftType) + ' Specialization:** ' + specializedCrafters);
            }

         } else {
             msg.channel.send('Sorry, the item you\'re looking for is not found. Please make sure you\'re using the item name and not the full recipe name.');
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
}
});

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

client.login(env.BOT_TOKEN);