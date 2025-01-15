import { ScrapybaraClient } from "scrapybara";
import { anthropic } from "scrapybara/anthropic";
import { SYSTEM_PROMPT } from "scrapybara/prompts";
import {
  bashTool,
  computerTool,
  editTool,
  browserTool,
} from "scrapybara/tools";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const client = new ScrapybaraClient({
    apiKey: process.env.SCRAPYBARA_API_KEY,
  });

  const instance = await client.start();

  try {
    await instance.browser.start();

    await client.act({
      tools: [
        computerTool(instance),
        bashTool(instance),
        editTool(instance),
        browserTool(instance),
      ],
      model: anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      }),
      system: SYSTEM_PROMPT,
      prompt:
        "There is a browser open on the screen (you can take ss to confirm). Go to scrapybara.com and tell me what you see.",
      onStep: (step) => {
        console.log(step);
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    await instance.stop();
  }
}

main().catch(console.error);
