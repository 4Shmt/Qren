#!/usr/bin/env node

/**
 * Qren Discord Bots - Main Entry Point  
 * GitHub/Render compatible version
 */

// Required environment variables
const requiredEnvVars = [
    'DISCORD_BOT_TOKEN',
    'CONTROL_BOT_TOKEN',
    'CONSOLE_BOT_TOKEN', 
    'PUBLISHING_BOT_TOKEN',
    'TAG_SEARCH_BOT_TOKEN'
];

function checkEnvironmentVariables() {
    console.log('🔍 Checking environment variables...');
    
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
        console.error(`❌ Missing environment variables: ${missingVars.join(', ')}`);
        console.error('Please set all required Discord bot tokens.');
        process.exit(1);
    }
    
    console.log('✅ All environment variables are set');
}

function startBots() {
    console.log('🌟 ═══════════════════════════════════════');
    console.log('🚀 Qren Discord Bots System Starting');
    console.log('🌟 ═══════════════════════════════════════');
    
    checkEnvironmentVariables();
    
    // Start each bot by requiring them - they will run automatically
    try {
        console.log('🚀 Loading Avatar Bot...');
        require('./DISCORD_BOT_TOKEN.js');
        
        console.log('🚀 Loading Control Bot...');
        require('./CONTROL_BOT_TOKEN.js');
        
        console.log('🚀 Loading Console Bot...');
        require('./CONSOLE_BOT_TOKEN.js');
        
        console.log('🚀 Loading Publishing Bot...');
        require('./PUBLISHING_BOT_TOKEN.js');
        
        console.log('🚀 Loading Tag Search Bot...');
        require('./TAG_SEARCH_BOT_TOKEN.js');
        
        console.log('✅ All bots loaded successfully');
        console.log('📊 System is running...');
        
    } catch (error) {
        console.error('❌ Error loading bots:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// Graceful shutdown handlers
process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Received SIGINT, shutting down gracefully...');
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Start the system
if (require.main === module) {
    startBots();
}

module.exports = { startBots };