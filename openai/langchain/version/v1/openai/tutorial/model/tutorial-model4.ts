import "dotenv/config";
import { AIMessageChunk, initChatModel } from "langchain";

const model = await initChatModel("openai:gpt-5-nano");

const stream = await model.stream("개발자들이 많이 사용하는 언어 TOP5는 뭐가 있니?");

let full: AIMessageChunk | null = null;
for await (const chunk of stream) {
    full = full ? full.concat(chunk) : chunk;
    console.log(full.text);
}

console.log(full.contentBlocks);