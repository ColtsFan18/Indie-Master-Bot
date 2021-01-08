module.exports = {
    name: 'idol',
    description: 'changes the host id',
    cooldown: 0,
    args: false,
    argslength: 0,
    usage: '',
    execute(message, args, client) {

        if (message.member.roles.cache.filter(role => role.name == "Host").size == 1) {
            // const config = require("./Json/commandConfigs.json")
                
            //if (args.length != 1) return
            if (args.length == 1) {
                const config = require("./Json/commandConfigs.json")
                var fs = require('fs');
                if (args[0] == "grid" || args[0] == "crystal" || args[0] == "mastermind") {
                    config.idolMethod = args[0];
                }
                fs.writeFile("./Commands/Json/commandConfigs.json", JSON.stringify(config, null, 4), (err) => {
                    if (err) message.channel.send("err");
                })
                const discord = require('discord.js');
                const Embed = new discord.MessageEmbed()
                    .setColor('#6fd251')
                    .setTitle('__New idol search!__')
                    .setDescription("You have just changed the searching method to **"+String(args[0]).toUpperCase() + "!** use !help-indie to see the new commands!")
                    //.setURL('')
                    .setAuthor('IndieBot', 'https://i.imgur.com/SgXpFXA.png')
                message.channel.send(Embed);
            }
        }
        else {
            message.reply("Not a host!");
        }

    }
}