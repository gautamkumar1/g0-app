import { Sandbox } from '@e2b/code-interpreter'
import { AgentResult, TextMessage } from '@inngest/agent-kit';

export const getSandbox = async (sandboxId: string) => {
  const sandbox = await Sandbox.connect(sandboxId);
  return sandbox;
}

export const lastAssistantMessageContent = async (result: AgentResult) => {
    const lastAssignstantMessageTextIndex = result.output.findLastIndex(message => message.role === "assistant")
    // TextMessage represents plain text messages in the chat history, eg. the user's prompt or an assistant's reply. 
    const message = result.output[lastAssignstantMessageTextIndex] as TextMessage | undefined;

    return message?.content ? typeof message.content === "string" ? message.content : message.content.map(item => item.text).join("") : undefined;

}
