import { ScrapybaraClient } from "scrapybara";
import { openai, UBUNTU_SYSTEM_PROMPT } from "scrapybara/openai";
import { bashTool, computerTool, editTool } from "scrapybara/tools";
import { z } from "zod";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function main() {
  // Initialize client
  const client = new ScrapybaraClient({
    apiKey: process.env.SCRAPYBARA_API_KEY,
  });

  // Start new instance
  const instance = await client.startUbuntu();

  try {
    // Execute action
    const { output } = await client.act({
      model: openai(),
      tools: [bashTool(instance), computerTool(instance), editTool(instance)],
      system: UBUNTU_SYSTEM_PROMPT,
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
    await instance.stop();
  }
}

main().catch(console.error);
