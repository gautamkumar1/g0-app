import { inngest } from "./client";
import { createAgent, createNetwork, openai } from '@inngest/agent-kit';
import { Sandbox } from '@e2b/code-interpreter'
import { getSandbox, lastAssistantMessageContent } from "@/utils/e2b";
import { createTool } from '@inngest/agent-kit';
import { z } from 'zod';
import { systemPrompt } from "@/utils/prompt";
import { prisma } from "@/utils/db";
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
      system: systemPrompt,
      model: openai({ model: 'gpt-4.1' }),
      tools: [
        // Tool 1 : terminal tool to run commands in the terminal
        createTool({
          name:"terminal",
          description:"Use this tool to run commands in the terminal",
          parameters: z.object({
            command: z.string(),
          }),
          handler: async ({command},{step}) =>{
            return await step?.run("terminal", async ()=>{
              const buffers = {stdout:"",stderr:""};
              try {
                const sandbox = await getSandbox(sandboxId);
                const result = await sandbox.commands.run(command, {
                  onStdout: (data:string) => {
                    buffers.stdout += data
                  },
                  onStderr: (data:string) => {
                    buffers.stderr += data
                  },
                });
                return result.stdout
              } catch (error:any) {
                console.error(
                  `Command failed: ${error} \nstdout: ${buffers.stdout}\nstderror: ${buffers.stderr}`
                );
                return `Command failed: ${error} \nstdout: ${buffers.stdout}\nstderror: ${buffers.stderr}`  
              }
            })
          }
        }),

        // Tool 2 : createOrUpdateFiles tool to create or update files in the sandbox
        createTool({
          name:"createOrUpdateFiles",
          description:"Use this tool to create or update files in the sandbox",
          parameters: z.object({
            files: z.array(z.object({
              path: z.string(),
              content: z.string(),
            })),
          }),
          handler: async ({files},{step,network})=>{
            return await step?.run("createOrUpdateFiles", async ()=>{
              try {
                // Initialize network state if it doesn't exist
                if (!network.state.data) {
                  network.state.data = {};
                }
                if (!network.state.data.files) {
                  network.state.data.files = {};
                }
                
                const sandbox = await getSandbox(sandboxId);
                const updatedFiles = { ...network.state.data.files };
                
                for (const file of files) {
                  await sandbox.files.write(file.path, file.content);
                  updatedFiles[file.path] = file.content;
                }
                
                // Update network state
                network.state.data.files = updatedFiles;
                
                return `Successfully created/updated ${files.length} file(s): ${files.map(f => f.path).join(', ')}`;
              } catch (error:any) {
                console.error(
                  `Failed to create or update files: ${error}`
                );
                return `Failed to create or update files: ${error.message || error}`
              }
            })
          }
        }),

        
      // Tool 3 : ReadFile tool to read files from the sandbox

      createTool({
        name: "readFile",
        description: "Use this tool to read files from the sandbox",
        parameters: z.object({
          files: z.array(z.string()),
        }),
        handler: async ({files},{step})=>{
          return await step?.run("readFile", async ()=>{
            try {
              const sandbox = await getSandbox(sandboxId);
              const contents = [];
                for (const file of files) {
                  const content = await sandbox.files.read(file);
                  contents.push({ path: file, content });
                }
                return JSON.stringify(contents);
            } catch (error:any) {
              console.error(
                `Failed to read files: ${error}`
              );
              return `Failed to read files: ${error}`
              
            }
          })
        }
      })
      ],
    // Lifecycle hook to store the summary of the task in the network state - this will be used to store the summary of the task in the network state so that it can be used in the next step of the agent.
    lifecycle:{
      onResponse: async ({result,network})=>{
        const lastAssistantTextMessageContent = await lastAssistantMessageContent(result);
        if(lastAssistantTextMessageContent && network){
          // Initialize network state if it doesn't exist
          if (!network.state.data) {
            network.state.data = {};
          }
          if(lastAssistantTextMessageContent.includes("<task_summary>")){
            network.state.data.summary = lastAssistantTextMessageContent;
          }
        }
        return result;
      }
      
    }

    });

    // creating network state for the agent
    const network = createNetwork({
      name: "coder-network",
      agents: [coder],
      maxIter:15,
      router: async ({network})=>{
        // Initialize network state if it doesn't exist
        if (!network.state.data) {
          network.state.data = {};
        }
        const summary = network.state.data.summary;
        if(summary){
          return ;
        }
        return coder;
      }
    })
    
    // Initialize network state before running
    if (!network.state.data) {
      network.state.data = {};
    }
    
    const result = await network.run(`write the following snippet: ${event.data.text}`);
    const sandboxUrl = await step.run('get-sandbox-url', async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(8081);
      return `https://${host}`;
    });
// save the result to the database
    await step.run('save-result',async()=>{
      await prisma.message.create({
        data:{
          content: result.state.data.summary,
          role: "ASSISTANT",
          messageType: "RESULT",
          fragment:{
            create:{
              sandboxUrl: sandboxUrl,
              title: "Fragment",
              files: result.state.data?.files || {},
            }
          }
        }
      });
    });
    
    return { 
      url: sandboxUrl,
      title:"Fragment",
      files: result.state.data?.files || {},
      summary: result.state.data?.summary || null,
     };
  },
);
