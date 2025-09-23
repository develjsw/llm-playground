import "dotenv/config";
import { AIMessage, initChatModel } from "langchain";

const model = await initChatModel("openai:gpt-5-nano");

const response = await model.invoke("개발자는 보통 무슨일을 하니?");

(response instanceof AIMessage)
    ? console.log("AIMessage 타입 일치")
    : console.log("AIMessage 타입 불일치")

// AIMessage 타입 일치