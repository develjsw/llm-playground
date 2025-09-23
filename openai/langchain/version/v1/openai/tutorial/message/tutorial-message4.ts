import "dotenv/config";
import { HumanMessage, initChatModel } from "langchain";

const model = await initChatModel("openai:gpt-5-nano");

const humanMessage = new HumanMessage({
    content: "안녕~",
    name: "홍길동",
    id: "message-12345"
});

// humanMessage에 대한 내부 DB 로그 생성로직 여기에 추가..

const response = await model.invoke([humanMessage]);
console.log(response);

