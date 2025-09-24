import "dotenv/config";
import { initChatModel, SystemMessage, AIMessage, HumanMessage } from "langchain";

const model = await initChatModel("openai:gpt-5-nano");

const conversation = [
    new SystemMessage("당신은 한국어를 프랑스어로 번역해주는 통역사입니다."),
    new HumanMessage("안녕 친구, 요새 거기 날씨는 어떠니?"),
    // 튜토리얼 이기 때문에 AIMessage를 확인 후 인위적으로 넣어주었으나, 실제로는 값을 받아온 후 다시 추가하는 방식으로 진행되야 함
    // 예상 결과 : Salut mon ami, quel temps fait-il là-bas ces derniers temps ?
    new AIMessage("Salut mon ami, quel temps fait-il là-bas ces derniers temps ?"),
    new HumanMessage("추가로 다음 문장도 넣어줘. 한국은 날씨가 엄청 좋아.")
    // 예상 결과 : Salut mon ami, quel temps fait-il là-bas ces derniers temps ? Le temps en Corée est vraiment agréable.
];

const response = await model.invoke(conversation);
console.log(response);

/*
    [ LLM 응답 결과 값 확인 ]

    AIMessage {
      "id": "chatcmpl-아이디값",
      "content": "Salut mon ami, quel temps fait-il là-bas ces derniers temps ? Le temps en Corée est vraiment beau.",
      "additional_kwargs": {},
      "response_metadata": {
        "tokenUsage": {
          "promptTokens": 89,
          "completionTokens": 1312,
          "totalTokens": 1401
        },
        "finish_reason": "stop",
        "model_provider": "openai",
        "model_name": "gpt-5-nano-2025-08-07"
      },
      "tool_calls": [],
      "invalid_tool_calls": [],
      "usage_metadata": {
        "output_tokens": 1312,
        "input_tokens": 89,
        "total_tokens": 1401,
        "input_token_details": {
          "audio": 0,
          "cache_read": 0
        },
        "output_token_details": {
          "audio": 0,
          "reasoning": 1280
        }
      }
    }
*/