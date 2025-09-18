import "dotenv/config";
import { z } from "zod";
import { createAgent, tool } from "langchain";

const getGreetingsToUser = tool(({ userName }) => `안녕하세요, ${userName}님!`, {
    name: "get_greetings_user",                                     // tool 이름 (LLM에게 이런 기능이 있다는 것을 알려주는 용도)
    description: "본인의 이름을 밝히고 고민을 말할 때 이걸 사용하면 돼",   // tool 설명 (LLM이 어떤 상황에서 이 툴을 써야하는지 판단할 수 있게 도와줌)
    schema: z.object({                                              // tool이 받는 입력구조를 Zod 스키마로 정의 (LLM이 argument를 JSON 형태로 맞춰서 생성)
        userName: z.string()
    })
});

// createAgent는 여러가지 기능을 결합하여 LLM 에이전트를 만드는 기능
// 아래 예시에서는 AI 모델을 설정하고, getGreetingsToUser라는 tool 기능을 결합하여 에이전트를 생성함
const agent = createAgent({
    model: "anthropic:claude-3-7-sonnet-latest",
    tools: [getGreetingsToUser],
});

console.log(
    await agent.invoke({
        //messages: [{ role: "user", content: "대한민국 수도에 대해서 알려줄래?" }],
        messages: [{ role: "user", content: "나는 홍길동이야. 나이를 먹어갈수록 걱정이 많아져. 해결방법 알려줄래?" }],
    })
);