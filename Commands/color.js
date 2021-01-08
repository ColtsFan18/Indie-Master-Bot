const mastermindIdolInfo = require("./Json/mastermindIdolInfo.json");
const crystalIdolInfo = require("./Json/crystalIdolInfo.json");
const gridIdolInfo = require("./Json/gridIdolInfo.json");
var fs = require('fs');

module.exports = {
    name: 'color',
    description: 'sends the parchment',
    cooldown: 0,
    args: false,
    argslength: 0,
    usage: '',
    execute(message, args,client) {

        //message.channel.send({files: ["./pictures/parchment.png"]})

        if(message.member.roles.cache.filter(role => role.name == "Host").size == 1) 
        {

            oldName = String(args[0]);
            if(mastermindIdolInfo.hasOwnProperty(oldName)&&crystalIdolInfo.hasOwnProperty(oldName)&&gridIdolInfo.hasOwnProperty(oldName)){
                mastermindIdolInfo[oldName].color = args[1]
                crystalIdolInfo[oldName].color = args[1]
                gridIdolInfo[oldName].color = args[1]
            }
            else{
                message.reply("Tribe, **" + args[0] + "** wasnt a tribe name!\nPlease try again!!")
            }

            
                message.reply("Tribe, **" + args[0] + "** has had their color changed!")
            
            
            fs.writeFile("./Commands/Json/mastermindIdolInfo.json", JSON.stringify(mastermindIdolInfo, null, 4), (err) => {
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