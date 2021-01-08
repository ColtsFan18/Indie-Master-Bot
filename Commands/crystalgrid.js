
const idolInfo = require("./Json/crystalIdolInfo.json")
const config = require("./Json/commandConfigs.json")
var fs = require('fs');

module.exports = {
    name: 'cgsearch',
    description: '',
    cooldown: 8*60*60,
    args: false,
    argslength: 0,
    usage: '',
    execute(message, args) {
        //////////////////////////////////// Variables
        const discord = require('discord.js');
        const client = new discord.Client;
        var input = "";
        var row;
        var col;
        var roleName ="";
        var tribes = [];
        for(var t in idolInfo) tribes.push(t);
        console.log(tribes);
        const embed = new discord.MessageEmbed()
                .setTitle("__**"+config.season+"**__").setAuthor('IndieBot', 'https://i.imgur.com/SgXpFXA.png')
                //.setColor("#42f572"); 
        ////////////////////// Validation
        var regexStr = String(args[0]).match(/[a-j]+|[^a-j]+/gi);
        if(args.length != 1)
            {
                console.log("Error");
                message.reply("sorry your co-ordinate was too long. Please try again.\nUse a single letter between **A-Z** & a number between **1-9**")
                return true;
            }
            if (isNaN(parseInt(regexStr[0]))) {
                col = regexStr[1];
                row = regexStr[0].toUpperCase();
            }
            else {
                col = regexStr[0];
                row = regexStr[1].toUpperCase();
            }
            if (col > 10 || col < 1 || !(row.match(/[a-j]/i))) {
                console.log("Error");
                message.reply("sorry your co-ordinate wasnt in the porper range. Please try again.\nUse a single letter between **A-Z** & a number between **1-9**")
                return true;
            }
            coord = String(row+col);

            if(message.member.roles.cache.filter(role => role.name == "Castaway").size == 1) 

        {
            //////////////////////////////////////////////////////Sets the tribe
            for (x in tribes) {
                var temp = tribes[x];
                if(message.member.roles.cache.filter(role => role.name == temp).size == 1) {    
                    roleName = String(temp);
                    embed.setColor(idolInfo[roleName].color)
                    console.log(roleName);
                }
            }
            //////////////////////////////////////////////////////

            var unfoundList = idolInfo[roleName].unfound;
            var foundList = idolInfo[roleName].found;
            if(idolInfo[roleName].unfound.includes(coord))
                {
            var str = "./pictures/"+roleName+".png";
            if(roleName == "14?")
            {
                var str = "./pictures/14.png";

            }
		    //message.channel.send({files: ["./pictures/parchment.png"]})
                    embed.setDescription("You found a crystal, it looks like it is quite valuable!")
                    embed.setColor("#00FF00")
		    //embed.attachFile(str)
                    message.channel.send("<@&"+config.hostId+">")
                    //message.channel.send("<@&676432484312940560>")
                    const index = unfoundList.indexOf(coord);
                    index > -1 ? unfoundList.splice(index, 1) : false
                    foundList.push(coord);
                }
                else if(idolInfo[roleName].found.includes(coord))
                {
                    embed.setDescription("There is nothing here, although it looks like something used to be here!")
                    embed.setColor("#FF0000")
                }
                else
                {
                    embed.setDescription("You look around the area, but nothing is here. You head back to camp to avoid drawing attention to yourself!");
                }
                message.reply(embed);
        }
        else{
            message.channel.send("Dont try to cheat ;)")
        }
        fs.writeFile("./Commands/Json/crystalIdolInfo.json", JSON.stringify(idolInfo, null, 4), (err) => {
            if (err) message.channel.send(err);
        })
        if(message.member.roles.cache.filter(role => role.name == "Host").size == 1) 
        {
            //console.log("hi")
            return true;
        }

    }}