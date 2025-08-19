# Qren Discord Bots - Multi-Bot System

A robust Discord bot ecosystem with advanced self-healing and monitoring capabilities, designed for continuous operation and resilience.

## Features

- **5 Specialized Discord Bots** running concurrently
- **Automatic Recovery** and restart mechanisms
- **Real-time Health Monitoring** 
- **24/7 Continuous Operation**
- **Multi-platform Deployment** (Replit, GitHub, Render)

## Bot Architecture

### Core Bots
1. **Avatar Bot** (`DISCORD_BOT_TOKEN.js`) - Handles avatar sharing with interactive buttons
2. **Control Bot** (`CONTROL_BOT_TOKEN.js`) - Dashboard for monitoring and administrative settings  
3. **Console Bot** (`CONSOLE_BOT_TOKEN.js`) - Administrative actions and user moderation
4. **Publishing Bot** (`PUBLISHING_BOT_TOKEN.js`) - Server promotion and categorization
5. **Tag Search Bot** (`TAG_SEARCH_BOT_TOKEN.js`) - Tag-based server discovery

## Environment Variables

Set the following environment variables in your hosting platform:

```env
DISCORD_BOT_TOKEN=your_avatar_bot_token_here
CONTROL_BOT_TOKEN=your_control_bot_token_here  
CONSOLE_BOT_TOKEN=your_console_bot_token_here
PUBLISHING_BOT_TOKEN=your_publishing_bot_token_here
TAG_SEARCH_BOT_TOKEN=your_tag_search_bot_token_here
```

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/qren-discord-bots.git
   cd qren-discord-bots
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variables**
   - Create Discord applications and bots at https://discord.com/developers/applications
   - Copy the bot tokens to your environment variables

4. **Start the system**
   ```bash
   npm start
   ```

## Deployment

### Render
1. Connect your GitHub repository to Render
2. Use the included `render.yaml` configuration
3. Set environment variables in Render dashboard
4. Deploy automatically

### Replit
1. Import repository to Replit
2. Add bot tokens to Secrets
3. Run the project

### GitHub Actions (Optional)
The project includes workflow configurations for CI/CD.

## Technology Stack

- **Node.js** - Runtime environment
- **Discord.js v14** - Discord API library
- **Express.js** - HTTP server for keep-alive
- **Concurrently** - Parallel process execution

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions, please create an issue on GitHub.