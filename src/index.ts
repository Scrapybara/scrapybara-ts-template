import { ScrapybaraClient } from "scrapybara";
import { anthropic } from "scrapybara/anthropic";
import { SYSTEM_PROMPT } from "scrapybara/prompts";
import {
  bashTool,
  computerTool,
  editTool,
  browserTool,
} from "scrapybara/tools";
import { z } from "zod";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function main() {
  // Initialize client
  const client = new ScrapybaraClient({
    apiKey: process.env.SCRAPYBARA_API_KEY,
  });
  const instance = await client.start();
  instance.browser.start();

  try {
    // Execute action
    const { output } = await client.act({
      model: anthropic(),
      tools: [
        bashTool(instance),
        computerTool(instance),
        editTool(instance),
        browserTool(instance),
      ],
      system: SYSTEM_PROMPT,
      prompt: "Get the top 10 posts on Hacker News",
      schema: z.object({
        posts: z.array(
          z.object({
            title: z.string(),
            url: z.string(),
            points: z.number(),
          })
        ),
      }),
      onStep: (step) => console.log(step.text),
    });

    // Access structured output
    const posts = output?.posts;
    console.log(posts);
  } finally {
    // Cleanup
    await instance.browser.stop();
    await instance.stop();
  }
}

main().catch(console.error);
