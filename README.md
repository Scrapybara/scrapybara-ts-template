<div id="toc" align="center">
  <ul style="list-style: none">
    <summary>
      <h1>Scrapybara TypeScript Template</h1>
    </summary>
  </ul>
</div>

<p align="center">
  <a href="https://github.com/scrapybara/scrapybara-playground/blob/main/license"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue" /></a>
  <a href="https://discord.gg/s4bPUVFXqA"><img alt="Discord" src="https://img.shields.io/badge/Discord-Join%20the%20community-6D1CCF.svg?logo=discord" /></a>
  <a href="https://x.com/scrapybara"><img alt="X" src="https://img.shields.io/badge/Twitter-Follow%20us-6D1CCF.svg?logo=X" /></a>
</p>

A template project for quickly getting started with the Scrapybara SDK and Act SDK for agentic desktop and browser automation.

## Prerequisites

- Node.js 18 or higher
- pnpm
- A Scrapybara API key (https://scrapybara.com/dashboard)

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
├── .cursorrules      # Cursor rules for working with the Scrapybara SDK
├── .env              # Environment variables
├── package.json      # pnpm dependencies and project config
├── tsconfig.json     # TypeScript configuration
└── README.md         # This file
├── src/
│   └── index.ts      # Main script
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

You can add more custom tools by defining them as shown [here](https://docs.scrapybara.com/tools#define-custom-tools).

```typescript
const tools = [
  computerTool(instance),
  bashTool(instance),
  editTool(instance),
  // Add your new tools here
];
```

### Error Handling

The template includes basic error handling with automatic cleanup:

- Catches and prints any exceptions
- Ensures instance cleanup via `finally` block
- Stops the browser and instance properly

### Custom Model Configuration

Modify the model initialization to use your own API key:

```typescript
model: anthropic({
  name: "claude-3-7-sonnet-20240219-thinking",
  apiKey: process.env.ANTHROPIC_API_KEY,
});
```

## Cursor Rules

We've included a `.cursorrules` file that contains instructions for working with the Scrapybara SDK.

## Support

For Scrapybara SDK issues:

- Visit the [Scrapybara documentation](https://docs.scrapybara.com)
- Join the [Discord community](https://discord.gg/s4bPUVFXqA)
- Contact hello@scrapybara.com

For template project issues:

- Open an issue in this repository
