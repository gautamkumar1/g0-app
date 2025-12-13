import { inngest } from "./client";
import { createAgent, openai } from '@inngest/agent-kit';
import { Sandbox } from '@e2b/code-interpreter'
import { getSandbox } from "@/utils/e2b";

export const aiAgent = inngest.createFunction(
  { id: "coder-agent" },
  { event: "ai/coderAgent" },
  async ({ event, step }) => {
    const sandboxId = await step.run('get-sandbox-id', async () => {
      const sandbox = await Sandbox.create('g0-expo-app-v1');
      return sandbox.sandboxId;
    });

    const coder = createAgent({
      name: "Coder",
      system: "You are a senior React Native developer specialized in Expo. You produce clean, readable, and maintainable code with clear naming, small components, and simple logic. Your code follows best practices and avoids unnecessary abstraction.",
      model: openai({ model: 'gpt-4o-mini' }),
    });
    const result = await coder.run(`write the following snippet: ${event.data.text}`);
    const sandboxUrl = await step.run('get-sandbox-url', async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(19006);
      return `https://${host}`;
    });
    return { coder: result };
  },
);
