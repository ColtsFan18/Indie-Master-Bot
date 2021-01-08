module.exports = {
    name: 'parchment',
    description: 'sends the parchment',
    cooldown: 0,
    args: false,
    argslength: 0,
    usage: '',
    execute(message, client) {

        message.channel.send({files: ["./pictures/parchment.png"]})
        //message.channel.send("imgur.com/3ef10b20-649b-4be2-9b84-4d5b1cc3b911")

    }
}