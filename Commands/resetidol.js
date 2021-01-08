module.exports = {
    name: 'reset',
    description: 'sends the parchment',
    cooldown: 0,
    args: false,
    argslength: 0,
    usage: '',
    execute(message, args, client) {

        //const command = require(`./Commands/${file}`)//One for each idol search method.

        console.log("hi");

        idol = "crystal";
        const config = require("./Json/commandConfigs.json")
        idol = config.idolMethod;

        if(message.member.roles.cache.filter(role => role.name == "Host").size == 1) {

            if(idol == "grid") // Only need 1 argument, the co ord.
            {
                const grid = require(`./resetG.js`)//One for each idol search method.
                grid.execute(message,args,client);
            }
            else if(idol == "crystal")// Only need 1 argument, the co ord.
            {
                const crystal = require(`./resetC.js`)//One for each idol search method.
                crystal.execute(message,args,client);
            }
            else if(idol == "mastermind")// Only need 5 argument, the co ords.
            {
                const mastermind = require(`./resetMM.js`)//One for each idol search method.
                mastermind.execute(message,args,client);
            }
            else{
                return true; // This will put the cooldown as 0;
            }


        }

    }
}