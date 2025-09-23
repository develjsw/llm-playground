import "dotenv/config";
import { initChatModel } from "langchain";

const model = await initChatModel("openai:gpt-5-nano");

const response = await model.invoke("langchain에 대해서 설명해줄래? 1줄로 짧게 요약해서 설명해줘.");
console.log(response);

/*
    [ LLM 응답 결과 값 확인 ]

    AIMessage {
      "id": "chatcmpl-아이디값",
      "content": "LangChain은 대형 언어 모델(LLM)을 활용한 애플리케이션 개발을 쉽게 만들어 주는 프레임워크로, LLM 간의 체인 구성, 도구/데이터 소스 연동, 메모리 관리 등을 한 곳에서 다룰 수 있도록  해줍니다.",
      "additional_kwargs": {},
      "response_metadata": {
        "tokenUsage": {
          "promptTokens": 29,
          "completionTokens": 460,
          "totalTokens": 489
        },
        "finish_reason": "stop",
        "model_provider": "openai",
        "model_name": "gpt-5-nano-2025-08-07"
      },
      "tool_calls": [],
      "invalid_tool_calls": [],
      "usage_metadata": {
        "output_tokens": 460,
        "input_tokens": 29,
        "total_tokens": 489,
        "input_token_details": {
          "audio": 0,
          "cache_read": 0
        },
        "output_token_details": {
          "audio": 0,
          "reasoning": 384
        }
      }
    }
*/