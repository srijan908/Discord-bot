require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: ['MESSAGE', 'Reaction']
});

const PREFIX = "$";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    if (CMD_NAME === 'kick') {
      if (!message.member.permissions.has('KickMembers')) {
        return message.reply('You do not have permissions to use that command.')
      }
      if (args.length === 0) {
        return message.reply("Please provide an ID.");
      }
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked.`)) // it is necessary that the bot contains the adequate roles and heirarchy in the server
          .catch((err) => message.channel.send('I cannot kick that user'));
      } else {
        message.channel.send("That member was not found");
      }
    } else if (CMD_NAME === 'ban') {
      if (!message.member.permissions.has('BanMembers')) {
        return message.reply('You do not have permissions to use that command.')
      }
      if (args.length === 0) {
        return message.reply("Please provide an ID.");
      }
      try {
        const user = await message.guild.members.ban(args[0]);
        console.log(user);
      } catch (err) {
        console.log(err);
        message.channel.send('An error occured. Either I do not have permissions or the user was not found.')
      }
    }
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '213213123545545') {
    switch (name) {
      case '�': 
        member.roles.add('1226844491487645707');
        break;
    }
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '213213123545545') {
    switch (name) {
      case '�': 
        member.roles.remove('1226844491487645707');
        break;
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
