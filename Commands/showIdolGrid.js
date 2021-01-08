var fs = require('fs');
const idolLocations = require('./Json/gridIdolInfo.json');
const discord = require('discord.js');
const client = new discord.Client;

module.exports = {
    name: 'gidolinfo',
    description: '',
    cooldown: 0,
    args: false,
    argslength: 0,
    usage: '',
    execute(message) {
        const Embed = new discord.MessageEmbed()
                .setColor('#6fd251')
                .setTitle('__Grid Idol Information__')
                .setDescription("This shows the idol locations for gird idols!")
                //.setURL('')
                .setAuthor('IndieBot', 'https://i.imgur.com/SgXpFXA.png')
            var tribeListString = "";
            var tribesString;
            //console.log(idolLocations["Tribes"].tribeslist);
            for (x in idolLocations) {
                //console.log(idolLocations);
                foundstring = "";

                    //console.log(idolLocations[y]);
                    if(idolLocations[x].found == true)
                    {
                        foundstring = "__*Found*__"
                    }
                    else if(idolLocations[x].found == false)
                    {
                        foundstring = "Unfound"
                    }
                    tribesString = "**"+foundstring+" :** " + idolLocations[x].location;
                    Embed.addField("__"+x+"__", tribesString, true);
                }
                    

                
            
            //Embed.setDescription(tribeListString);
           message.channel.send(Embed);
        


    }
}