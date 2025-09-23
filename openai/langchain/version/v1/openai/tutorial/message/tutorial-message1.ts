import "dotenv/config";
import { HumanMessage, initChatModel, SystemMessage } from "langchain";

const model = await initChatModel("openai:gpt-5-nano")

const systemMessage = new SystemMessage("당신은 개발자입니다. 개발에 관련된 도움을 주세요.");
const humanMessage = new HumanMessage("요새 신기술은 뭐가 있니?");

const messages = [systemMessage, humanMessage];

const response = await model.invoke(messages);
console.log(response);

/*
    [ LLM 응답 결과 값 확인 ]

    AIMessage {
      "id": "chatcmpl-아이디값",
      "content": "요즘 주목받는 기술 트렌드를 분야별로 간단히 정리해볼게요. 특정 분야가 있다면 더 자세히 맞춤정보 드릴게요.\n\n1) 인공지능/생성형 AI 개발 도구\n- 무엇이냐: 대형 언어모델(LM)과 생성
     모델을 소프트웨어에 쉽게 적용하고 운영하는 도구들.\n- 왜 중요한가: 개발 생산성↑, 맞춤형 AI 서비스 구축이 빨라짐.\n- 시작 포인트:\n  - LangChain, LlamaIndex, Haystack 같은 파이프라인 프레임
    워크로 데이터 소스 연결과 대화형 로직 구성하기\n  - GitHub Copilot X, 코드 생성/리팩토링 보조 기능 활용\n  - 모델 배포는 OpenAI/클라우드 API나 Hugging Face Inference Endpoints로 시작해 점차 자
    만의 파이프라인 구축하기\n\n2) 웹/클라이언트 개발의 저변 기술\n- 무엇이냐: WebGPU, WebAssembly(WebGPU와의 결합), WASI 등 웹에서도 고성능 컴퓨팅 가능해짐.\n- 왜 중요한가: 브라우저에서도 고성
    능 그래픽/계산 가능, 크로스 플랫폼 개발 강력해짐.\n- 시작 포인트:\n  - 간단한 WebGPU 예제로 GPU 가속 렌더링/계산 실습\n  - Rust/WebAssembly로 로직 일부를 모듈화해 프론트/백 엔드 간 경계 줄이기
    n\n3) 프로그래밍 언어/생태계 트렌드\n- 무엇이냐: Rust의 채택 증가, 시스템언어/도구 체인의 강화, WebAssembly의 확산.\n- 왜 중요한가: 안전하고 빠른 소프트웨어 개발이 가능하고, 크로스 플랫폼 개
    발이 쉬워짐.\n- 시작 포인트:\n  - Rust로 작은 CLI 도구나 라이브러리 하나 만들어 보기\n  - WASM/WASI를 활용한 모듈화된 기능 웹/CLI 공유하기\n\n4) 데이터/MLops 및 데이터 관리\n- 무엇이냐: 데이터
    중심 AI, Feature store, 데이터 버전 관리, 벡터 데이터베이스\n- 왜 중요한가: 모델 성능은 데이터 품질에 좌우되고, 운영은 재현성과 관리가 핵심.\n- 시작 포인트:\n  - 벡터 DB(Pinecone, Weaviate 등등
    로 간단한 검색 기반 애플리케이션 만들기\n  - 데이터 파이프라인과 모델 버전을 MLflow/Kubeflow 수준으로 시작해 보기\n\n5) 엣지/임베디드 AI\n- 무엇이냐: 엣지 디바이스에서의 ML 추론 및 작은 모델
    운영\n- 왜 중요한가: 지연 최소화, 프라이버시 강화, 네트워크 의존도 감소.\n- 시작 포인트:\n  - Jetson, Apple Core ML 등의 도구로 간단한 엣지 추론 프로젝트\n  - 모델 경량화(양자화, pruning) 기법
    체험\n\n6) 클라우드/인프라 자동화\n- 무엇이냐: 자동화된 배포, 비용 최적화, 멀티 클라우드 운영, 관측성 강화\n- 왜 중요한가: 대규모 서비스의 안정성·비용 관리가 핵심.\n- 시작 포인트:\n  - GitOpss
    , Terraform/Kubernetes를 활용한 간단한 배포 파이프라인 구성\n  - OpenTelemetry로 관측성 수집 및 알림 체계 구성\n\n7) 보안·프라이버시 중심의 기술\n- 무엇이냐: 연합학습, 프라이버시 보존 ML, SBOM
    /소스코드 공급망 보안 강화\n- 왜 중요한가: 규제와 신뢰성 확보에 필수.\n- 시작 포인트:\n  - 기본적인 SBOM 관리와 공급망 보안 모범 사례 학습\n  - 연합학습 아이디어를 소규모 실험으로 체험해보기\n
    \n8) 양자컴퓨팅/차세대 컴퓨팅\n- 무엇이냐: 연구·시뮬레이션 수준의 양자컴퓨팅 발전\n- 왜 중요한가: 특정 문제에서 앞으로의 속도/효율성 향상 가능성.\n- 시작 포인트:\n  - 공개된 양자 시뮬레이터나
    큐브 등의 입문 자료로 개념 익히기\n\n실무에 바로 적용하는 팁\n- 관심 분야 하나를 선택해 작은 프로젝트 하나 시작하기: 예를 들어 WebGPU로 간단한 그래픽 앱, 벡터 DB를 이용한 검색 서비스, Rust로
    유틸리티 도구 만들기.\n- 공식 문서와 예제부터 시작하고, 간단한 튜토리얼로 Hands-on 경험 축적.\n- 커뮤니티 참여로 최신 소식과 사례를 빠르게 파악하기.\n\n혹시 어떤 분야를 더 구체적으로 원하나요? 웹/모바일 개발, 데이터 사이언스, 시스템 프로그래밍, AI 제품구현 등 관심 분야를 알려주시면 거기에 맞춰 실무 예제 로드맵이나 학습 경로를 상세히 제안해 드릴게요.",
      "additional_kwargs": {},
      "response_metadata": {
        "tokenUsage": {
          "promptTokens": 36,
          "completionTokens": 2934,
          "totalTokens": 2970
        },
        "finish_reason": "stop",
        "model_provider": "openai",
        "model_name": "gpt-5-nano-2025-08-07"
      },
      "tool_calls": [],
      "invalid_tool_calls": [],
      "usage_metadata": {
        "output_tokens": 2934,
        "input_tokens": 36,
        "total_tokens": 2970,
        "input_token_details": {
          "audio": 0,
          "cache_read": 0
        },
        "output_token_details": {
          "audio": 0,
          "reasoning": 1792
        }
      }
    }
*/