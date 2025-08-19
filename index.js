#!/usr/bin/env node
/**
 * Index.js - Entry point for Qren Discord Bots
 * This is the main entry file that starts the deployment system
 */

const DeploymentManager = require('./deploy_bots.js');

console.log('🌟 Qren Discord Bots - Multi-Bot System');
console.log('🚀 Starting deployment system...');

async function main() {
    try {
        const deployment = new DeploymentManager();
        await deployment.runDeployment();
    } catch (error) {
        console.error('💥 Fatal error in main:', error.message);
        process.exit(1);
    }
}

// Start the system
if (require.main === module) {
    main();
}

module.exports = main;