const idolLocations = require("./Json/gridIdolInfo.json")
var fs = require('fs');

module.exports = {
    name: 'testtesttest4',
    description: 'resets idol location',
    cooldown: 0,
    args: false,
    argslength: 1,
    usage: '<Tribe> <Location to reset>',
    execute(message, args, client) {

        if (message.member.roles.cache.filter(role => role.name == "Host").size == 1) {

            if (!args.length == 2) {
                message.reply("Sorry, you didnt provide the right arguments. You need the TribeName, the new cords")
            return true;
            }
            var col;
            var row;
            if (args[1].toLowerCase() == "random".toLowerCase()) {
                var newrow = Math.floor(Math.random() * 10) + 97;
                var newcol = Math.floor(Math.random() * 9) + 1;
                newcord = (String.fromCharCode(newrow)).toUpperCase() + newcol.toString();
            }
            else {
                regexStr = String(args[1]).match(/[a-z]+|[^a-z]+/gi);
                if (isNaN(parseInt(regexStr[0]))) {
                    //console.log(parseInt(regexStr[0]))
                    col = regexStr[1];
                    row = regexStr[0].toUpperCase();
                }
                else {
                    col = regexStr[0];
                    row = regexStr[1].toUpperCase();
                }
                if (col > 10 || col < 1 || !(row.match(/[a-j]/i))) {
                    console.log("Error");
                    message.reply("Sorry, you entered the 2nd coord wrong. Please try again.")
                    return true;
                }
                var newcord = String(row + col);
            }


            // var list = [];
            // if (args.length == 2 && args[1] == "random".toLowerCase()) {
            //     while (list.length <= 4) {
            //         //console.log(list.length);
            //         var newrow = Math.floor(Math.random() * 26) + 97;
            //         var newcol = Math.floor(Math.random() * 9) + 1;
            //         newcord = (String.fromCharCode(newrow)).toUpperCase() + newcol.toString();

            //         if (!list.includes(newcord)) {
            //             list.push(newcord);
            //         }
            //     }
            // }
            // else{
            // message.reply("Sorry, you didnt provide the right arguments. You need the TribeName, the new cords")
            // return true;
            // }
            

        }
        var tribes = [];
        for (var t in idolLocations) tribes.push(t);
        if (tribes.includes(args[0])) {

            coord = idolLocations[args[0]].location;
            idolLocations[args[0]].location = newcord;
            idolLocations[args[0]].found = false;
            
            message.reply("\nYou have removed: **" + coord + "**\nYou have added: **" + newcord +"**");
            // message.reply("\nYou have removed: **" + oldList + "**\nYou have added: **" + list + "**");
            // idolLocations[args[0]].location = list;
            fs.writeFile("./Commands/Json/gridIdolInfo.json", JSON.stringify(idolLocations, null, 4), (err) => {
                if (err) message.channel.send(err);
            })
        }
        // message.reply("\nYou have removed: **" + oldList + "**\nYou have added: **" + list + "**");
        // idolLocations[temp].location = list;
        // fs.writeFile("./Commands/idolLocations.json", JSON.stringify(idolLocations, null, 4), (err) => {
        //     if (err) message.channel.send(err);
        // })


    }

}
