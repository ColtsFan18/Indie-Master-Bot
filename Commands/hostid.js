module.exports = {
    name: 'hostid',
    description: 'changes the host id',
    cooldown: 0,
    args: false,
    argslength: 0,
    usage: '',
    execute(message, args, client) {

        if(message.member.roles.cache.filter(role => role.name == "Host").size == 1) 
        {
            if(args.length != 1) return
            else
            {
                const config = require("./Json/commandConfigs.json")
                var fs = require('fs');
                config.hostId = args[0];
                fs.writeFile("./Commands/Json/commandConfigs.json", JSON.stringify(config, null, 4), (err) => {
                    if (err) message.channel.send(err);
                })
                const discord = require('discord.js');
                const Embed = new discord.MessageEmbed()
                .setColor('#6fd251')
                .setTitle('__New Host ID!__')
                .setDescription("You have just changed the host ID! This will be the role pinged when a castaway finds an idol!\n You have it set it as : <@&"+config.hostId+">")
                //.setURL('')
                .setAuthor('IndieBot', 'https://i.imgur.com/SgXpFXA.png')
                message.channel.send(Embed);
            }
        }
        else{
            message.reply("Not a host!");
        }

    }
}