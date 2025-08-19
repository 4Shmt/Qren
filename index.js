const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const logger = require('./utils/logger');
const config = require('./config/config.json');
require('dotenv').config();

// Initialize keep-alive system for 24/7 operation
require('./keep-alive');

// Initialize heartbeat system
const HeartbeatSystem = require('./heartbeat');

// Create Discord client with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers
    ]
});

// Initialize commands collection
client.commands = new Collection();
const slashCommands = [];

// Initialize heartbeat system
const heartbeat = new HeartbeatSystem(client);

// Load bot settings
let botSettings = {};
try {
    botSettings = JSON.parse(fs.readFileSync('./data/settings.json', 'utf8'));
} catch (error) {
    botSettings = {
        isActive: true,
        adminUsers: [],
        lastActivity: null,
        statistics: {
            totalBroadcasts: 0,
            totalMessagesSent: 0,
            failedMessages: 0,
            usersManaged: 0
        }
    };
    saveSettings();
}

function saveSettings() {
    try {
        fs.writeFileSync('./data/settings.json', JSON.stringify(botSettings, null, 2));
    } catch (error) {
        logger.error('Failed to save settings:', error);
    }
}

// Load commands dynamically
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    if (command.execute && command.data) {
        client.commands.set(command.data.name, command);
        slashCommands.push(command.data.toJSON());
    }
}

// Check if user is admin
function isAdmin(userId) {
    return config.adminUsers.includes(userId) || botSettings.adminUsers.includes(userId);
}

// Bot ready event
client.once('ready', async () => {
    logger.info(`Bot logged in as ${client.user.tag}`);
    logger.info(`Bot is ${botSettings.isActive ? 'ÙØ´Ø·' : 'ØºÙØ± ÙØ´Ø·'}`);
    
    // Register slash commands
    const rest = new REST().setToken(process.env.DISCORD_TOKEN);
    try {
        logger.info('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: slashCommands },
        );
        logger.info('Successfully reloaded application (/) commands.');
    } catch (error) {
        logger.error('Error refreshing slash commands:', error);
    }
    
    // Set bot status - online and ready
    client.user.setPresence({
        activities: [{
            name: botSettings.isActive ? 'ÙØ¸Ø§Ù Ø§ÙØ¨Ø« ÙØªØµÙ â¢ 24/7' : 'ÙØ¸Ø§Ù Ø§ÙØ¨Ø« ØºÙØ± ÙØªØµÙ',
            type: 'WATCHING'
        }],
        status: 'online'
    });
    
    // Start heartbeat system for 24/7 operation
    heartbeat.start();
});

// Slash command handler
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    // Admin command check (except for add-admin when no admins exist)
    if (command.adminOnly && !isAdmin(interaction.user.id)) {
        // Special case: allow add-admin when no admins exist
        if (interaction.commandName === 'add-admin' && (!botSettings.adminUsers || botSettings.adminUsers.length === 0)) {
            // Allow this command to proceed
        } else {
            return await interaction.reply({ content: 'â ÙÙØ³ ÙØ¯ÙÙ ØµÙØ§Ø­ÙØ© ÙØ§Ø³ØªØ®Ø¯Ø§Ù ÙØ°Ø§ Ø§ÙØ£ÙØ±.', ephemeral: true });
        }
    }

    try {
        await command.execute(interaction, client, botSettings, saveSettings);
        botSettings.lastActivity = new Date().toISOString();
        saveSettings();
    } catch (error) {
        logger.error('Slash command execution error:', error);
        const errorMessage = 'â Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«ÙØ§Ø¡ ØªÙÙÙØ° ÙØ°Ø§ Ø§ÙØ£ÙØ±.';
        
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: errorMessage, ephemeral: true });
        } else {
            await interaction.reply({ content: errorMessage, ephemeral: true });
        }
    }
});

// Error handling
client.on('error', (error) => {
    logger.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
    logger.error('Unhandled promise rejection:', error);
});

// Login to Discord
const token = process.env.DISCORD_TOKEN || process.env.BOT_TOKEN;
if (!token) {
    logger.error('No Discord token provided. Please set DISCORD_TOKEN in your environment variables.');
    process.exit(1);
}

client.login(token).catch(error => {
    logger.error('Failed to login to Discord:', error);
    logger.error('Token length:', token ? token.length : 'No token');
    logger.error('Token starts with:', token ? token.substring(0, 10) + '...' : 'No token');
    logger.error('Full error details:', JSON.stringify(error, null, 2));
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    logger.info('Shutting down bot...');
    heartbeat.stop();
    client.destroy();
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.info('Received SIGTERM, shutting down bot...');
    heartbeat.stop();
    client.destroy();
    process.exit(0);
});

// Handle uncaught exceptions to prevent crashes
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    // Don't exit, let the heartbeat system handle reconnection
});

// Keep the process alive with periodic logging
setInterval(() => {
    logger.debug(`Bot uptime: ${Math.floor(process.uptime())} seconds`);
}, 300000); // Every 5 minutes

// Export for use in commands
module.exports = { client, isAdmin, saveSettings };
