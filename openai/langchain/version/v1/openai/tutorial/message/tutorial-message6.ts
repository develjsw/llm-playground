import "dotenv/config";
import { initChatModel, AIMessage, HumanMessage, SystemMessage } from "langchain";

const model = await initChatModel("openai:gpt-5-nano");

const aiMessage1 = new AIMessage("제대로된 도움을 드리기 위해 회원정보를 조회할 수 있는 이메일을 입력해주세요.");

// DB에서 가져온 데이터라 가정
const userInfoFromDb = { userId: 1001, name: "홍길동", email: "aaa@gmail.com", address: "서울시 강남구 개포동", totalPoint: 999999 };

const aiMessage2 = new AIMessage(`${userInfoFromDb.name}님 반가워요~ 필요한 도움을 말씀해주세요.`);

const messages = [
    new SystemMessage("당신은 회원들에게 도움을 주는 챗봇입니다."),
    new HumanMessage("나좀 도와줄 수 있니?"),
    aiMessage1,
    new HumanMessage("aaa@gmail.com 이거야."),
    aiMessage2,
    new HumanMessage("혹시 내 포인트 총액이 얼마 남았니?")
];

const response = await model.invoke(messages);
console.log(response);
/*
    [ LLM 응답 결과 값 확인 ]

    AIMessage {
      "id": "chatcmpl-아이디값",
      "content": "홍길동님, 포인트 잔액을 확인해 드릴게요.\n\n다만 이 대화창에서 바로 계정 정보를 조회하려면 보안상 확인이 필요합니다. 조회를 계속 진행해도 될까요? 예라고 답해주시면 aaa@gmail.com 페이지/포인트 현황: 앱이나 웹에서 로그인 후 내 포인트 잔액을 확인\n- 고객센터 문의: 전화나 챗봇을 통해 계정 인증 후 잔액 안내 받기\n\n어떤 방식으로 도와드릴까요?",
      "additional_kwargs": {},
      "response_metadata": {
        "tokenUsage": {
          "promptTokens": 110,
          "completionTokens": 2785,
          "totalTokens": 2895
        },
        "finish_reason": "stop",
        "model_provider": "openai",
        "model_name": "gpt-5-nano-2025-08-07"
      },
      "tool_calls": [],
      "invalid_tool_calls": [],
      "usage_metadata": {
        "output_tokens": 2785,
        "input_tokens": 110,
        "total_tokens": 2895,
        "input_token_details": {
          "audio": 0,
          "cache_read": 0
        },
        "output_token_details": {
          "audio": 0,
          "reasoning": 2624
        }
      }
    }
*/