
const idolInfo = require("./Json/mastermindIdolInfo.json")
const config = require("./Json/commandConfigs.json")
var fs = require('fs');

module.exports = {
    name: 'mmsearch',
    description: '',
    cooldown: 6 * 60 * 60,
    args: false,
    argslength: 0,
    usage: '',
    execute(message, args) {
        //////////////////////////////////// Variables
        const discord = require('discord.js');

        var tribes = [];
        for(var t in idolInfo) tribes.push(t);
        //console.log(tribes);


        //const client = new discord.Client;
        var row;
        var col;
        var roleName = "";
        var coords = [];
        const embed = new discord.MessageEmbed()
            .setTitle("__**"+config.season+"**__").setAuthor('IndieBot', 'https://i.imgur.com/SgXpFXA.png')           
        if (args.length != 5) {
            message.reply("Sorry, you didnt provide **Five** Co-ordinates. You can try again!")
            return true;
        }
        for (x in args) {
            var regexStr = String(args[x]).match(/[a-z]+|[^a-z]+/gi);
            if(args[x].length != 2)
            {
                console.log("Error");
                message.reply("sorry one of your co-ordinates was too long. Please try again.\nUse a single letter between **A-Z** & a number between **1-9**")
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
            if (col > 9 || col < 1 || !(row.match(/[a-z]/i))) {
                console.log("Error");
                message.reply("sorry one of your co-ordinates wasnt in the porper range. Please try again.\nUse a single letter between **A-Z** & a number between **1-9**")
                return true;
            }
            var coord = String(row + col);
            coords.push(coord);
        }
        for (x in coords)
        {
            for(y in coords)
            {
                if(x!=y && coords[x]==coords[y])
                {
                    message.reply("Sorry, you didnt 5 different coords. Please try again.")
                    return true;
                }
            }
        }
        if(message.member.roles.cache.filter(role => role.name == "Castaway").size == 1) {
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

            var list = ""
            var list2 = "";
            var correct = true;

            for(i = 0; i < 5; i++)
            {
                if ((idolInfo[roleName].location).includes(coords[i]))
                {
                    if (coords[i] == idolInfo[roleName].location[i])
                    {
                        list = list + ":green_circle:  - " + coords[i] + "\n"
                        list2 =list2 +"O\n";
                    }
                    else{
                        list = list + " :yellow_heart: - " + coords[i] + "\n"
                        list2 =list2 +"!\n";
                        if (correct == true) {correct = false};//:exclamation: :x:  :o: 
                    }
                }
                else{
                    list = list + ":red_square:  - " + coords[i] + "\n"
                    list2 =list2 +"X\n";
                    if (correct == true) {correct = false};
                }
            }
            var resultText = "";
            const embed2 = new discord.MessageEmbed()
            .setTitle("__**Idol!**__");
            if (correct == true) {resultText = "Congratulations you have completed the sequence!\n"
                if(idolInfo[roleName].found == false)
                {
                    embed2.setDescription("**You also found the hidden immunity idol for the " + roleName + " Tribe!**").setAuthor('IndieBot', 'https://i.imgur.com/SgXpFXA.png');
                    idolInfo[roleName].found = true;
                    message.channel.send("<@&"+config.hostId+">");
                    embed2.setColor("#00FF00")
                }
                else if(idolInfo[roleName].found == true)
                {
                    embed2.setDescription("**You find a hole left in the sand..**");
                    embed2.setColor("#FF0000")
                }
                message.channel.send(embed2);
            }
            else{
                resultText = "Sorry, but your sequence is incorrect! Please try again in 6 hours!"
            }
            
            embed.setDescription(resultText)
            .setFooter('You can guess again every 6 hours!');
            embed.addFields({ name: 'Input', value: list, inline: true},{ name: 'Key', value: ':red_square: : This means the coord wasnt in the sequence at all.\n:yellow_heart: : This means the coord was in the sequence but not in the correct place.\n:green_circle: : This means the coord was in the sequence and in the correct place!', inline: false})
            message.reply(embed);
        }
        else {
            message.channel.send("You're not a castaway!")
        }
        fs.writeFile("./Commands/Json/mastermindIdolInfo.json", JSON.stringify(idolInfo, null, 4), (err) => {
            if (err) message.channel.send(err);
        })
        if(message.member.roles.cache.filter(role => role.name == "Host").size == 1) {
            return true;
        }

    }
}