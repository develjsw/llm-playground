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
    model: "openai:gpt-4o-mini",
    tools: [getGreetingsToUser],
});

console.log(
    await agent.invoke({
        //messages: [{ role: "user", content: "대한민국 수도에 대해서 알려줄래?" }],
        messages: [{ role: "user", content: "나는 홍길동이야. 나이를 먹어갈수록 걱정이 많아져. 해결방법 알려줄래?" }],
    })
);

/*
    [ LLM 응답 결과 값 확인 ]

    [질문1] '대한민국 수도에 대해서 알려줄래?'에 대해서 물어본 경우 tool에 정의했던 description에 해당되지 않기 때문에 tool을 사용하지 않은 것을 확인할 수 있음
        AIMessage {
              "id": "ID값",
              "content": "대한민국의 수도는 서울입니다. 서울은 한국의 정치, 경제, 문화의 중심지로, 인구가 약 1000만 명 이상 거주하는 대도시입니다. 여러 역사적 유적지와 현대적인 건축물이 공존하며, 강남
         명동, 홍대 등 다양한 지역이 상업과 문화의 중심지로 유명합니다. 또한, 지하철과 버스 등 대중교통이 잘 발달되어 있고, 각종 편의 시설들이 많아 생활하기 편리한 도시입니다. 서울은 국제적인 도시로  서 외국인들에게도 인기 있는 관광지입니다.",
        }

    [질문2] '나는 홍길동이야. 나이를 먹어갈수록 걱정이 많아져. 해결방법 알려줄래?'에 대해서 물어본 경우 tool에 정의했던 description에 해당된다고 LLM이 판단하여 tool을 사용한 부분을 확인할 수 있음
         AIMessage {
              "id": "ID값",
              "content": "안녕하세요, 홍길동님! 나이가 들면서 걱정이 많아지는 것은 자연스러운 일이에요. 걱정을 줄이기 위한 몇 가지 방법을 소개해드릴게요:\n\n1. **규칙적인 운동**: 신체 활동은 스트레스
        를 줄이고 기분을 좋게 만드는데 도움을 줍니다. 주기적으로 운동하는 습관을 들여보세요.\n\n2. **명상과 호흡 연습**: 명상이나 심호흡은 마음을 차분하게 하고 걱정을 덜어주는 데 도움을 줄 수 있습니다
        \n\n3. **건강한 식습관**: 균형 잡힌 식사는 정신 건강에도 긍정적인 영향을 미칩니다. 영양가 있는 음식을 섭취하세요.\n\n4. **사회적 관계 유지**: 친구나 가족과 시간을 보내고 소통하는 것은 정서적
        인 지지망을 제공합니다.\n\n5. **전문가의 도움 받기**: 필요하다면 심리상담사나 정신 건강 전문가와 상담해보는 것도 좋은 방법입니다.\n\n6. **명확한 목표 설정**: 걱정하는 문제의 구체적인 해결책을 설정하고 실행해 보세요.\n\n이러한 방법들이 조금이나마 도움이 되길 바랍니다. 걱정이 많으신 만큼, 스스로를 잘 돌보는 것도 중요합니다.",
        }
*/