import "dotenv/config";
import { initChatModel, SystemMessage, HumanMessage, AIMessage } from "langchain";

const model = await initChatModel("openai:gpt-5-nano");

const messages = [
    new SystemMessage("당신은 개발자입니다."),
    new HumanMessage("요새 유행하는 개발용어 1가지만 추천해줘"),
    // AIMessage는 이전 대화내용을 기억해둘 수 있는 용도로 사용
    new AIMessage("GitOps\n\n설명: Git을 선언적 구성의 단일 진실 소스로 삼아 인프라와 배포 파이프라인을 관리하는 운영 방식. 특히 Kubernetes 등에서 널리 채택되며, 자동화, 재현성, 롤백 용이성이 큰 장으로 부각되고 있습니다."),
    new HumanMessage("DevOps와 비슷한 개념인거야?")
];

const response = await model.invoke(messages);
console.log(response);

/*
    [ LLM 응답 결과 값 확인 ]

    AIMessage {
        "id": "chatcmpl-아이디값",
            "content": "네, 부분적으로 맞아요. GitOps는 DevOps의 실천 방법 중 하나라고 볼 수 있습니다.\n\n요점 정리\n- DevOps: 개발과 운영 간의 협업 문화, 자동화, 지속적 전달(CI/CD) 등의 큰 철학과 접근
        방식 전체를 가리킵니다.\n- GitOps: 그 중에서 인프라 관리와 배포를 자동화하기 위한 구체적인 구현 패턴으로, Git을 단일 진실 소스로 삼아 선언적 상태(desired state)를 자동으로 배포/동기화하는 방식
        니다. 주로 Kubernetes 환경에서 많이 활용됩니다.\n\n비슷한 점\n- 자동화와 재현성 추구\n- 버전 관리(Git)를 중심으로 운영 상태를 관리\n- 배포를 빠르게 하고 롤백을 쉽게 하는 목표\n\n다른 점\n-
        범위: DevOps는 문화, 조직 구조, 협업 방식까지 포함하는 넓은 개념이고, GitOps는 그 안의 하나의 실천 방법에 해당합니다.\n- 구현 초점: DevOps는 전체 소프트웨어 생애주기(코드 작성-테스트-배포-운영
        전반을 포함하는 반면, GitOps는 주로 인프라의 선언적 관리와 자동 배포에 집중합니다.\n- 기술 구성: DevOps는 다양한 도구와 파이프라인을 포괄하고, GitOps는 Git, 선언적 구성, 자동 동기화 도구(예::
        Argo CD, Flux) 같은 특정 도구 체계와 원칙에 의존하는 경우가 많습니다.\n\n언제 노려보면 좋을까\n- 이미 DevOps 문화를 도입 중이고, Kubernetes 같은 클라우드 네이티브 환경에서 인프라를 선언적으로
        관리하고 싶다면 GitOps가 좋은 선택이 될 수 있습니다.\n- 반대로 문화와 협업이 아직 정립되지 않았다면, GitOps 도입이 먼저 해결되진 않을 수 있습니다. 먼저 DevOps 문화와 기본 CI/CD를 확립하는 것  이 도움이 됩니다.\n\n필요하면 여러분의 스택(Kubernetes 여부, 기존 CI/CD 도구, 팀 규모 등)에 맞춰 GitOps 도입 체크리스트나 도입 단계도 만들어 드릴게요.",
        "additional_kwargs": {},
        "response_metadata": {
            "tokenUsage": {
                "promptTokens": 123,
                    "completionTokens": 1254,
                    "totalTokens": 1377
            },
            "finish_reason": "stop",
                "model_provider": "openai",
                "model_name": "gpt-5-nano-2025-08-07"
        },
        "tool_calls": [],
            "invalid_tool_calls": [],
            "usage_metadata": {
            "output_tokens": 1254,
                "input_tokens": 123,
                "total_tokens": 1377,
                "input_token_details": {
                "audio": 0,
                    "cache_read": 0
            },
            "output_token_details": {
                "audio": 0,
                    "reasoning": 768
            }
        }
    }
*/