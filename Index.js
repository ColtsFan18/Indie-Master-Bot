const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json')
const keep_alive = require('./keepalive.js')


const client = new Discord.Client();
//client.idols = require(`./idol.json`);
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

var guess;
//Discord.Client.setUsername("IndieBot")

for (const file of commandFiles) {
	const command = require(`./Commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	

	if (!message.content.startsWith(prefix) || message.author.bot) return; //Returns if not stated a command or if a bot does it


	const args = message.content.slice(prefix.length).split(' '); //Removes prefix, splits arguments by space( eg !search f 3 goes to search,f,3)
	//const command = args.shift().toLowerCase();
	const commandName = args.shift().toLowerCase();

	//if (!client.commands.has(command)) return;
	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);
	if (command.args) {
		if(args.length != command.argslength)
		{	let reply = `You didn't provide any arguments, ${message.author}!`; 
			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
				
		}
		return message.channel.send(reply);
	}
	// if(command.name == 'search')
	// {
	// 	if ((args[0] >= 1 && args[0] <= 12) && (args[1].length === 1 && args[1].match(/[a-l]/i))) {	
	// 	}
	// 	else if ((args[1] >= 1 && args[1] <= 12) && (args[0].length === 1 && args[0].match(/[a-l]/i))) {
	// 	}
	// 	else{
	// 		return message.channel.send(`You didnt provide a valid location to search, ${message.author}!\nUse letters A-L and Numbers 1-12\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``);
	// 	}
	// }		
	}


	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			var secs;

			var hours = Math.floor(timeLeft / 3600);
			secs = timeLeft % 3600;
			var minutes = Math.floor(secs / 60);
			var seconds = secs % 60;

			const discord = require('discord.js');
			const Embed = new discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('__Please Wait!__')
                //.setURL('')
				.setAuthor('IndieBot', 'https://i.imgur.com/SgXpFXA.png')
				.setDescription(`please wait ** `+hours+` hours, `+minutes+` minutes and ` + Math.round(seconds) +` seconds** before using the \`${command.name}\` command.`)

			message.reply("");
			return message.reply(Embed);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		if(command.name == "search")
		{
			var temp = command.execute(message, args, client);
			if(temp==true)
			{
				timestamps.delete(message.author.id)
			}
		}
		else
		{
			command.execute(message,args,client);
		}
		
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

	// if(command == 'search')
	// {
	// 	client.commands.get('search').execute(message, args);
	// }
})

client.login(token);