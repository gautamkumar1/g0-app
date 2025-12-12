import { inngest } from "./client";
import { createAgent, openai } from '@inngest/agent-kit';

export const aiAgent = inngest.createFunction(
  { id: "coder-agent" },
  { event: "ai/coderAgent" },
  async ({ event }) => {
    const coder = createAgent({
      name: "Coder",
      system: "You are a senior React Native developer specialized in Expo. You produce clean, readable, and maintainable code with clear naming, small components, and simple logic. Your code follows best practices and avoids unnecessary abstraction.",
      model: openai({ model: 'gpt-4o-mini' }),
    });
    const result = await coder.run(`write the following snippet: ${event.data.text}`);
    return { coder: result };
  },
);
