var fs = require('fs');
const idolInfo = require("./Json/mastermindIdolInfo.json");
const discord = require('discord.js');
const client = new discord.Client;

module.exports = {
    name: 'mmidolinfo',
    description: '',
    cooldown: 0,
    args: false,
    argslength: 0,
    usage: '',
    execute(message) {
        if(message.member.roles.cache.filter(role => role.name == "Host").size == 1)  {
            const Embed = new discord.MessageEmbed()
                .setColor('#6fd251')
                .setTitle('__Mastermind Idol Information__')
                .setDescription("This shows the idol locations for mastermind idols!")
                //.setURL('')
                .setAuthor('IndieBot', 'https://i.imgur.com/SgXpFXA.png')
            var tribeListString = "";
            var tribesString;

            // var tribes = [];
            // for(var t in idolInfo) tribes.push(t);
            //console.log(idolLocations["Tribes"].tribeslist);
            for (x in idolInfo) {
                //console.log(idolLocations);
                if(x == "Tribes")
                {   
                    for(y in idolInfo["Tribes"].tribeslist)
                    {tribeListString = tribeListString + idolInfo["Tribes"].tribeslist[y] + "  "}
                }
                else {
                    tribesString = "**Seq :** ";
                    for(y in idolInfo[x].location)
                    {
                        tribesString = tribesString + idolInfo[x].location[y] + "  "
                    }
                    tribesString = tribesString + "\n**Found** : "+ idolInfo[x].found;
                    Embed.addField("__"+x+"__", tribesString, true);
                }
                    

                
            }
            //Embed.setDescription(tribeListString);
           message.channel.send(Embed);
        }


    }
}