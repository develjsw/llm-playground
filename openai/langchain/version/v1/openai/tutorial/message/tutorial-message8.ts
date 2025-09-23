import "dotenv/config";
import { initChatModel, AIMessageChunk } from "langchain";

const model = await initChatModel("openai:gpt-5-nano");

const stream = await model.stream("안녕하세요?");

let finalChunk: AIMessageChunk | undefined;
for await (const chunk of stream) {
    // concat 메서드는 AIMessageChunk에 구현된 병합 로직으로,
    // content 문자열은 이어 붙이고, tool_calls/metadata 등 다른 필드도 규칙에 맞게 합쳐줌
    finalChunk = finalChunk ? finalChunk.concat(chunk) : chunk;
}
console.log(finalChunk);

/*
    [ LLM 응답 결과 값 확인 ]

    AIMessageChunk {
      "id": "chatcmpl-아이디값",
      "content": "안녕하세요! 무엇을 도와드릴까요? 필요하신 것이 있으면 바로 도와드리겠습니다. 예를 들면:\n\n- 한국어 글쓰기나 번역/교정\n- 정보 검색 및 요약\n- 수학, 과학, 프로그래밍 문제 풀이\n- 일정·계획 짜기\n- 여행 정보나 맛집 추천\n- 코드 예제 작성\n\n원하시는 주제나 톤을 알려주시면 더 잘 도와드릴 수 있어요. 무엇부터 시작해볼까요?",
      "additional_kwargs": {},
      "response_metadata": {
        "prompt": 0,
        "completion": 0,
        "model_provider": "openai",
        "usage": {},
        "finish_reason": "stop",
        "system_fingerprint": null,
        "model_name": "gpt-5-nano-2025-08-07",
        "service_tier": "default"
      },
      "tool_calls": [],
      "tool_call_chunks": [],
      "invalid_tool_calls": []
    }
*/