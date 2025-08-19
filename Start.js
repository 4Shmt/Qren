#!/usr/bin/env node

/**
 * Qren Discord Bots - Main Entry Point
 * Starts all Discord bots concurrently for production deployment
 */

const { spawn } = require('child_process');
const path = require('path');

// Console colors for better logging
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
    const timestamp = new Date().toISOString();
    console.log(`${color}[${timestamp}] ${message}${colors.reset}`);
}

// Bot configurations
const bots = [
    { name: 'Avatar Bot', file: 'DISCORD_BOT_TOKEN.js', color: colors.blue },
    { name: 'Control Bot', file: 'CONTROL_BOT_TOKEN.js', color: colors.green },
    { name: 'Console Bot', file: 'CONSOLE_BOT_TOKEN.js', color: colors.yellow },
    { name: 'Publishing Bot', file: 'PUBLISHING_BOT_TOKEN.js', color: colors.magenta },
    { name: 'Tag Search Bot', file: 'TAG_SEARCH_BOT_TOKEN.js', color: colors.cyan }
];

// Required environment variables
const requiredEnvVars = [
    'DISCORD_BOT_TOKEN',
    'CONTROL_BOT_TOKEN', 
    'CONSOLE_BOT_TOKEN',
    'PUBLISHING_BOT_TOKEN',
    'TAG_SEARCH_BOT_TOKEN'
];

function checkEnvironmentVariables() {
    log('🔍 Checking environment variables...', colors.bright);
    
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
        log(`❌ Missing environment variables: ${missingVars.join(', ')}`, colors.red);
        log('Please set all required Discord bot tokens.', colors.red);
        process.exit(1);
    }
    
    log('✅ All environment variables are set', colors.green);
}

function startBot(bot, index) {
    const botProcess = spawn('node', [bot.file], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: process.env
    });

    log(`🚀 Starting ${bot.name} (${bot.file})`, bot.color);

    botProcess.stdout.on('data', (data) => {
        const message = data.toString().trim();
        if (message) {
            log(`[${bot.name}] ${message}`, bot.color);
        }
    });

    botProcess.stderr.on('data', (data) => {
        const error = data.toString().trim();
        if (error) {
            log(`[${bot.name}] ERROR: ${error}`, colors.red);
        }
    });

    botProcess.on('close', (code) => {
        if (code === 0) {
            log(`[${bot.name}] Exited successfully`, bot.color);
        } else {
            log(`[${bot.name}] Exited with code ${code}`, colors.red);
            
            // Restart bot after 5 seconds if it crashes
            setTimeout(() => {
                log(`🔄 Restarting ${bot.name}...`, colors.yellow);
                startBot(bot, index);
            }, 5000);
        }
    });

    botProcess.on('error', (error) => {
        log(`[${bot.name}] Process error: ${error.message}`, colors.red);
    });

    return botProcess;
}

function gracefulShutdown(processes) {
    log('🛑 Graceful shutdown initiated...', colors.yellow);
    
    processes.forEach((process, index) => {
        if (process && !process.killed) {
            log(`🛑 Stopping ${bots[index].name}...`, bots[index].color);
            process.kill('SIGTERM');
        }
    });

    setTimeout(() => {
        log('👋 All bots stopped. Goodbye!', colors.green);
        process.exit(0);
    }, 2000);
}

// Main execution
async function main() {
    log('🌟 ═══════════════════════════════════════', colors.bright);
    log('🚀 Qren Discord Bots System Starting', colors.bright);
    log('🔄 Production Mode', colors.bright);
    log('🌟 ═══════════════════════════════════════', colors.bright);

    // Check environment variables
    checkEnvironmentVariables();

    // Start all bots
    const processes = bots.map((bot, index) => startBot(bot, index));

    // Handle graceful shutdown
    ['SIGTERM', 'SIGINT', 'SIGUSR2'].forEach(signal => {
        process.on(signal, () => gracefulShutdown(processes));
    });

    log(`✅ Started ${bots.length} bot(s) successfully`, colors.green);
    log('📊 System is running and monitoring...', colors.bright);
}

// Start the system
if (require.main === module) {
    main().catch(error => {
        log(`❌ Fatal error: ${error.message}`, colors.red);
        console.error(error);
        process.exit(1);
    });
}

module.exports = { main };