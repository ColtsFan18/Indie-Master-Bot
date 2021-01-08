
var fs = require('fs');

module.exports = {
    name: 'rename',
    description: 'starts a challenge',
    cooldown: 0,
    args: true,
    argslength: 2, //!rename T1 Hell
    usage: '',
    execute(message, args, client) {
        if(message.member.roles.cache.filter(role => role.name == "Host").size == 1) 
        {

            const mastermindIdolInfo = require("./Json/mastermindIdolInfo.json");
const crystalIdolInfo = require("./Json/crystalIdolInfo.json");
const gridIdolInfo = require("./Json/gridIdolInfo.json");
            oldName = String(args[0]);
            if((mastermindIdolInfo.hasOwnProperty(oldName)&&crystalIdolInfo.hasOwnProperty(oldName)&&gridIdolInfo.hasOwnProperty(oldName))&&!(mastermindIdolInfo.hasOwnProperty(newName))&&!(crystalIdolInfo.hasOwnProperty(newName))&&!(gridIdolInfo.hasOwnProperty(newName))){
                var newName = args[1];
                mastermindIdolInfo[newName] = mastermindIdolInfo[oldName];
                delete mastermindIdolInfo[oldName];
                crystalIdolInfo[newName] = crystalIdolInfo[oldName];
                delete crystalIdolInfo[oldName];
                gridIdolInfo[newName] = gridIdolInfo[oldName];
                delete gridIdolInfo[oldName];
            }
            else{
                message.reply("Tribe, **" + args[0] + "** wasnt a tribe name!\nPlease try again!! (or u used an existing tribe name)")
                return;
            }

            
                message.reply("Tribe, **" + args[0] + "** has been renamed to **" + args[1] + "**!\nMake sure you rename the role aswell!")
            
            
            fs.writeFile("./Commands/Json/mastermindIdolInf1.json", JSON.stringify(mastermindIdolInfo, null, 4), (err) => {
                if (err) message.channel.send(err);
            })
            fs.writeFile("./Commands/Json/crystalIdolInfo.json", JSON.stringify(crystalIdolInfo, null, 4), (err) => {
                if (err) message.channel.send(err);
            })
            fs.writeFile("./Commands/Json/gridIdolInfo.json", JSON.stringify(gridIdolInfo, null, 4), (err) => {
                if (err) message.channel.send(err);
            })
        }
           
    
}

}
