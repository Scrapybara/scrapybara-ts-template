# Scrapybara TypeScript Template

A template project for quickly getting started with the Scrapybara SDK and Act SDK for AI-powered desktop and browser automation.

## Prerequisites

- Node.js 18 or higher
- pnpm
- A Scrapybara API key (https://scrapybara.com/dashboard)
- An Anthropic API key (optional, for using your own key)

## Setup

1. Clone this repository:

```bash
git clone https://github.com/scrapybara/scrapybara-ts-template.git
cd scrapybara-ts-template
```

2. Install dependencies using pnpm:

```bash
pnpm install
```

3. Copy the example environment file and add your API keys:

```bash
cp .env.example .env
```

Then edit `.env` with your API keys:

```bash
SCRAPYBARA_API_KEY=your_api_key_here
ANTHROPIC_API_KEY=your_api_key_here  # Optional
```

## Project Structure

```
.
├── .env                # Environment variables
├── package.json       # pnpm dependencies and project config
├── src/
│   └── index.ts      # Main script with Scrapybara setup
├── tsconfig.json     # TypeScript configuration
├── .cursorrules      # Cursor rules for working with the Scrapybara SDK
└── README.md         # This file
```

## Usage

Run the template script:

```bash
pnpm start
```

The script will:

1. Initialize a Scrapybara client
2. Start a new instance
3. Launch a browser
4. Use the Act SDK to navigate to scrapybara.com
5. Print the agent's observations
6. Clean up resources automatically

## Customization

### Modifying the Agent's Task

Edit the `prompt` parameter in `src/index.ts` to give the agent different instructions:

```typescript
prompt: "Your custom instructions here";
```

### Adding More Tools

You can add more custom tools by importing them from `scrapybara/tools`:

```typescript
import {
  bashTool,
  computerTool,
  editTool,
  browserTool,
} from "scrapybara/tools";

const tools = [
  computerTool(instance),
  bashTool(instance),
  editTool(instance),
  browserTool(instance),
  // Add your new tools here
];
```

### Error Handling

The template includes basic error handling with automatic cleanup:

- Catches and prints any exceptions
- Ensures instance cleanup via `finally` block
- Stops the browser and instance properly

## Advanced Usage

### Environment Variables

Add additional environment variables to `.env` as needed:

```bash
SCRAPYBARA_API_KEY=your_key
ANTHROPIC_API_KEY=your_key  # If using your own Anthropic key
```

### Custom Model Configuration

Modify the model initialization to use your own API key:

```typescript
model: anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
```

## Cursor Rules

We've included a `.cursorrules` file that contains instructions for working with the Scrapybara SDK.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT

## Support

For Scrapybara SDK issues:

- Visit the [Scrapybara documentation](https://docs.scrapybara.com)
- Join the [Discord community](https://discord.gg/s4bPUVFXqA)
- Contact hello@scrapybara.com

For template project issues:

- Open an issue in this repository
