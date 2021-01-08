module.exports = {
    name: 'search',
    description: 'sends the parchment',
    cooldown: 8*60*60,
    args: false,
    argslength: 0,
    usage: '',
    execute(message, args, client) {

        //const command = require(`./Commands/${file}`)//One for each idol search method.

        idol = "crystal";
        const config = require("./Json/commandConfigs.json")
        idol = config.idolMethod;

        if(message.member.roles.cache.filter(role => role.name == "Castaway").size == 1||message.member.roles.cache.filter(role => role.name == "Host").size == 1) {

            if(idol == "grid") // Only need 1 argument, the co ord.
            {
                if (args.length == 1)
                {
                    const grid = require(`./grid`)//One for each idol search method.
                    grid.execute(message,args,client);
                }
                else{
                    message.reply("Sorry, you didnt provide a **SINGLE** co-ordinate. Please try again!")
                    return true; // This will put the cooldown as 0;
                }
            }
            else if(idol == "crystal")// Only need 1 argument, the co ord.
            {
                if (args.length == 1)
                {
                    const crystal = require(`./crystalgrid`)//One for each idol search method.
                    crystal.execute(message,args,client);
                }
                else{
                    message.reply("Sorry, you didnt provide a **SINGLE** co-ordinate. Please try again!")
                    return true;
                }
            }
            else if(idol == "mastermind")// Only need 5 argument, the co ords.
            {
                if (args.length == 5)
                {
                    
                    const mastermind = require(`./mastermind`)//One for each idol search method.
                    mastermind.execute(message,args,client);
                }
                else{
                    message.reply("Sorry, you didnt provide **FIVE** co-ordinates.\nIf you did provid five co-ordinates make sure there is only a single space between them!\n Please try again!")
                    return true;
                }
            }
            else{
                message.reply("sorry you didnt enter the command correctly. Please try again.\nUse a !indie-help to see how to use the commands")
                return true; // This will put the cooldown as 0;
            }


        }
        if(message.member.roles.cache.filter(role => role.name == "Host").size == 1) {
            return true;
        }

    }
}