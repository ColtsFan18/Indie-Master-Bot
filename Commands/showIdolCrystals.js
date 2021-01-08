var fs = require('fs');
const idolLocations = require("./Json/crystalIdolInfo.json");
const discord = require('discord.js');
const client = new discord.Client;

module.exports = {
    name: 'cidolinfo',
    description: '',
    cooldown: 0,
    args: false,
    argslength: 0,
    usage: '',
    execute(message) {
        const Embed = new discord.MessageEmbed()
                .setColor('#6fd251')
                .setTitle('__Crystal Information__')
                .setDescription("This shows the locations for crystals!")
                //.setURL('')
                .setAuthor('IndieBot', 'https://i.imgur.com/SgXpFXA.png')
            var tribeListString = "";
            var tribesString;
            //console.log(idolLocations["Tribes"].tribeslist);
            for (x in idolLocations) {
                //console.log(idolLocations);

                    //console.log(idolLocations[y]);
                    tribesString = "**Unfound :** ";
                    for(y in idolLocations[x].unfound)
                    {
                        tribesString = tribesString + idolLocations[x].unfound[y] + "  "
                    }
                    tribesString = tribesString + "\n**Found :** ";
                    for(y in idolLocations[x].found)
                    {
                        tribesString = tribesString + idolLocations[x].found[y] + "  "
                    }
                    Embed.addField("__"+x+"__", tribesString, true);
                }
                    

                
            
            //Embed.setDescription(tribeListString);
           message.channel.send(Embed);
        


    }
}