require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// Blacklist IDs
const blacklist = [
  "USER_ID_HIER"
];

client.once("ready", () => {
  console.log(`✅ Bot online als ${client.user.tag}`);
});

client.on("guildMemberAdd", async member => {
  if (blacklist.includes(member.id)) {
    await member.ban({ reason: "Blacklist" });
    console.log(`🚫 ${member.user.tag} gebannt`);
  }
});

client.login(process.env.TOKEN);
