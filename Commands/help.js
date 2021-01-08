
module.exports = {
    name: 'help-indie',
    description: '',
    cooldown: 0,
    args: false,
    argslength: 0,
    usage: '',
    execute(message) {

        const discord = require('discord.js');
        const client = new discord.Client;
        var help = "";
        const config = require("./Json/commandConfigs.json")
        idol = config.idolMethod; 

        if(idol == "grid")
        {
            help = help + "**!search [co-ord]** - Searches for an idol!\n\n"
        }
        else if(idol == "crystal")
        {
            help = help + "**!search [co-ord]** - Searches for an idol!\n\n"
        }
        else if(idol == "mastermind")
        {
            help = help + "**!search [co-ord] [co-ord] [co-ord] [co-ord] [co-ord]** - Searches for an idol using a sequence!\n\n"
        }
        
        if(message.member.roles.cache.filter(role => role.name == "Host").size == 1) {

        help = help + "**!hostid [id of role]** - This will change the role that gets pinged when an idol/crystal is found\n**!idol [search type]** - this changed what idol system can be used, only one can be used at a time. The options to chose from are **grid** (from S10-12), **crystal** (from S14) and **mastermind** (from S15) (if you switch between them, everything should be saved)\n**!idolinfo** - This will show the idol information of whatever seach system you're using.\n"

        if(idol == "grid")
        {
            help = help + "**!reset [tribe] [new co-ord]** - Resets a tribe idol, to a place which you specifiy.\n**!reset [tribe] random** - Resets a tribe idol to a random place\n\n";
        }
        else if(idol == "crystal")
        {
            help = help + "**!reset [tribe] [old co-ord] [new co-ord]** - Resets a crystal, to a place which you specifiy.\n**!reset [tribe] [old co-ord] random** - Resets a a crystal to a random place\n\n"
        }
        else if(idol == "mastermind")
        {
            help = help + "**!reset [tribe] [new co-ord] [new co-ord] [new co-ord] [new co-ord] [new co-ord]** - Resets the sequance to one which you specifiy.\n**!reset [tribe] random** - Resets the sequance to a random one!\n\n"
        }

        help = help +"**!rename [old tribe] [new tribe]** - This will rename one tribe from another, make sure it the same as the role, and the arguments have to be case sensitive.\n**!color [tribe] [hex (without #)]** - changes the color of the embed for that tribe when searching!\n"
        
    }
            

    help = help + "**!parchment** - sends a parchment, edit this to vote";

    if(message.member.roles.cache.filter(role => role.name == "Host").size == 1) {

        help = help +"\n\n\n__***NOTE***__: Since you are using repl, information changed wont save properly, such as changing the idol search system, changing a tribe color / name, someone finding an idol, or reseting an idol.\n To change this where it WILL save, you will have to go on repl, and just open the files in the json folder and save them yourself."

    }
    const embed = new discord.MessageEmbed()
    .setTitle("__**Indie Bot Commands**__")
    .setColor("#6fd251")
    .setDescription(help)
    .setAuthor('IndieBot', 'https://i.imgur.com/SgXpFXA.png')
        
        message.channel.send(embed);
    }

}