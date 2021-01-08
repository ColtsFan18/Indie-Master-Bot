const idolLocations = require("./Json/mastermindIdolInfo.json")
var fs = require('fs');

module.exports = {
    name: 'resetMM',
    description: 'resets idol location',
    cooldown: 0,
    args: false,
    argslength: 1,
    usage: '<Tribe> <Location to reset>',
    execute(message, args, client) {

        if (message.member.roles.cache.filter(role => role.name == "Host").size == 1) {

            var list = [];
            if (args.length == 2 && args[1].toLowerCase() == "random".toLowerCase()) {
                while (list.length <= 4) {
                    //console.log(list.length);
                    console.log("hello")
                    var newrow = Math.floor(Math.random() * 26) + 97;
                    var newcol = Math.floor(Math.random() * 9) + 1;
                    newcord = (String.fromCharCode(newrow)).toUpperCase() + newcol.toString();

                    if (!list.includes(newcord)) {
                        list.push(newcord);
                    }
                }
            }
            // else{
            // message.reply("Sorry, you didnt provide the right arguments. You need the TribeName, the new cords")
            // return true;
            // }
            else if (args.length == 6) {
                var list = [];
                for (x in args) {
                    if (x == 0) { }
                    else {
                        var regexStr = String(args[x]).match(/[a-z]+|[^a-z]+/gi);

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
                            message.reply("Sorry, you didnt search correctly. Please try again.")
                            return true;
                        }
                        var newcord = String(row + col);
                        if (list.includes(newcord)) {
                            message.reply("Sorry, you didnt search correctly. Please try again.")
                            return true;
                        }
                        list.push(newcord);
                    }
                }

                // if (idolLocations["Tribes"].tribeslist.includes(args[0])) {
                //     var temp = args[0];
                //     var oldList = idolLocations[temp].location;

                // }
                //         var tribes = [];
                // for(var t in idolInfo) tribes.push(t);
                // if(tribes.includes(args[0]))
                // {
                //     var oldList = idolLocations[temp].location;
                // }



            }
            else {
                message.reply("Sorry, you didnt provide the right arguments. You need the TribeName, the new cords")
                return true;
            }
            var tribes = [];
            for (var t in idolLocations) tribes.push(t);
            if (tribes.includes(args[0])) {
                var oldList = idolLocations[args[0]].location;
                message.reply("\nYou have removed: **" + oldList + "**\nYou have added: **" + list + "**");
                idolLocations[args[0]].location = list;
                idolLocations[args[0]].found = false;
                fs.writeFile("./Commands/Json/mastermindIdolInfo.json", JSON.stringify(idolLocations, null, 4), (err) => {
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
}