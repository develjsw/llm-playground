import "dotenv/config";
import { initChatModel } from "langchain";

const model = await initChatModel("openai:gpt-5-nano");

const responses = await model.batch([
    "백엔드 개발자는 어떤 언어들을 사용하나요?",
    "프론트엔드 개발자는 어떤 언어들을 사용하나요?",
    "LangChain은 무엇인가요?",
    "LangGraph는 무엇인가요?",
    "LangSmith는 무엇인가요?"
]);

for (const response of responses) {
    console.log(response);
}

/*
    [ LLM 응답 결과 값 확인 ]

    AIMessage {
      "id": "chatcmpl-아이디값",
      "content": "네, 백엔드 개발자가 자주 사용하는 대표적인 언어와 그 쓰임을 정리해 드릴게요.\n\n주요 백엔드 언어(각 언어의 대표적 환경)\n- Java: 대규모 엔터프라이즈 시스템의 표준. Spring/Spring
    Boot로 많이 사용.\n- C#: .NET / ASP.NET 기반의 기업용 백엔드에서 많이 쓰임.\n- Python: 빠른 개발과 다양한 라이브러리. Django나 Flask 같은 프레임워크가 흔함. 데이터 파이프라인/데이터 사이언스
    백엔드에도 많이 사용.\n- JavaScript/TypeScript: Node.js로 API 서버나 마이크로서비스 구성에 자주 사용. 풀스택 개발(프런트+백엔드) 선호 시 많이 선택.\n- PHP: 기존 웹 서비스의 백엔드에서 여전히
    많이 사용. Laravel, Symfony 같은 프레임워크가 흔함.\n- Ruby: Rails를 중심으로 빠르게 MVP를 만들 때 사용.\n- Go(GoLang): 고성능 네트워크·마이크로서비스에 강점. 동시성 모델이 간단하고 빠름.\n- K
    otlin: JVM 기반으로 Spring Boot 등과 함께 많이 쓰임. 모바일(Android)와의 연계성도 유리.\n- Scala: JVM 위에서 동작하며, 대규모 데이터 처리나 금융/데이터 파이프라인에 사용.\n- Rust: 성능과 안전
    성 높은 서비스에 점점 더 많이 도입.\n- Elixir: 실시간성(채팅, 라이브 업데이트 등)과 고가용성 시스템에 강점.\n- C/C++: 성능-critical 코드나 시스템/드라이버 영역, 게임 서버의 백엔드 등에서 사용.
    \n- Erlang: 고가용성 시스템(통신, 실시간 시스템)에서 전통적으로 사용.\n\n데이터 저장/쿼리와의 연계\n- SQL: 관계형 데이터베이스를 다루는 기본 언어.\n- NoSQL 쿼리 언어들: MongoDB의 MQL, Redis 명
    어 세트 등 데이터 저장소별 쿼리/명령어가 필요할 때 사용.\n\n현실적인 포인트\n- 다중 언어(polyglot) 환경이 일반적: 한 팀이 여러 언어를 함께 쓰거나, 서비스마다 다른 언어를 사용하는 경우가 많습습
    다.\n- 도메인에 따라 선호 언어가 크게 달라집니다. 엔터프라이즈 큰 시스템: Java/C#, 실시간/고성능: Go/Rust/Elixir, 빠른 MVP/초기 스타트업: Python/Ruby/JavaScript 등.\n- 프레임워크와 생태계도
    중요한 요인: Spring Boot(JVM), Django/Flask(Python), Express/Koa(Node.js), Rails(Ruby), Laravel(PHP) 등.\n\n초보자 가이드(추천 시작점)\n- 웹 백엔드 초보라면: Python(Django/Flask)나 JavaScript(
    Node.js)로 시작해 보세요. 빠르게 API를 만들고 테스트하기 좋습니다.\n- 엔터프라이즈/대규모 시스템에 관심 있다면: Java(Spring Boot)나 C#(.NET)부터 시작하는 것이 현실적으로 도움이 됩니다.\n- 고성
    /마이크로서비스에 관심 있다면: Go나 Rust를 고려해 보세요.\n\n원하시면 현재 관심 분야나 목표(웹 서비스, 데이터 파이프라인, 실시간 시스템 등)에 맞춰 구체적인 추천 언어와 학습 로드맷을 제시해    드릴게요. 어떤 분야에 집중하고 싶으신가요?",
    ...
   }

   AIMessage {
      "id": "chatcmpl-아이디값",
      "content": "주로 다루는 언어는 아래와 같습니다.\n\n- HTML: 웹 페이지의 구조를 만드는 마크업 언어\n- CSS: 스타일링. 레이아웃, 색상, 애니메이션 등을 정의\n  - CSS 프리프로세서: Sass/SCSS, Less
    , Stylus 등\n  - CSS-in-JS나 모듈 방식도 많이 씁니다 (예: styled-components, Emotion, CSS Modules)\n- JavaScript: 웹 페이지의 동작과 로직을 구현하는 주된 스크립트 언어\n\n현대 프론트엔드에서
    자주 함께 쓰이는 확장/변형 언어\n\n- TypeScript: JavaScript의 타입 시스템을 추가한 슈퍼셋으로, 대다수 팀에서 표준으로 점점 자리잡고 있습니다. 컴파일러가 JavaScript로 변환해 브라우저에서 실행합
    다.\n- JSX/TSX: React 같은 라이브러리에서 쓰는 XML-like 문법으로, JavaScript/TypeScript에 HTML 같은 구문을 결합한 확장형 문법\n\n웹 어셈블리 관련 고급 옵션\n\n- WebAssembly를 사용하는 경우가가
    늘어나고 있습니다.\n  - Rust, C/C++, AssemblyScript 등으로 작성한 모듈을 WASM으로 빌드해 성능이 필요한 부분에 쓰기도 합니다.\n  - 주로 계산 집약적 기능이나 엔진 로직 등에 활용\n\n그 외에 알아아
    면 도움이 되는 언어/대안들\n\n- CoffeeScript, Elm, PureScript 등은 과거에 쓰였지만 현재는 사용 비중이 낮아진 편\n- Dart(Flutter 웹)처럼 특정 프레임워크/환경에서 쓰이는 경우도 있지만 일반적인인
    프론트엔드 개발의 주류는 위의 HTML/CSS/JavaScript+TypeScript 쪽입니다.\n\n실무에서의 흔한 조합 예\n\n- HTML + CSS + JavaScript + TypeScript + React/Vue/Angular + Sass/SCSS + 번들러(Webpack/Vii
    te/Rollup)\n- HTML + CSS + JavaScript + Vue + TypeScript + CSS Modules\n- HTML + CSS + JavaScript + WebAssembly(Rust/C/C++)가 필요한 경우 모듈 부분에 WASM 사용\n\n요약하면, 프론트엔드 개발의
    기본은 HTML, CSS, JavaScript이며, 현대적으로는 TypeScript를 많이 쓰고, 필요에 따라 CSS 프리프로세서나 CSS-in-JS, 프레임워크/라이브러리(Javascript 생태계)와 함께 사용합니다. WASM은 성능이 중요 한 특정 부분에서 보조적으로 활용됩니다. 필요나 관심사에 따라 위 항목들 중 어떤 것을 먼저 배우는지가 달라집니다.",
    ...
   }

   AIMessage {
      "id": "chatcmpl-아이디값",
      "content": "LangChain은 대형 언어 모델(Large Language Model, LLM)을 활용해 AI 기반 애플리케이션을 쉽게 구축하도록 돕는 오픈 소스 프레임워크입니다. Python과 JavaScript/TypeScript 버전이 있으
    며, 모델과 도구를 연결하는 “사슬(chain)” 중심의 구성요소를 제공합니다.\n\n주요 개념\n- LLM: 실제 언어 모델과의 인터페이스를 다룹니다.\n- Prompt templates: 재사용 가능한 프롬프트 템플릿으로 입
    력 변수를 채워 프롬프트를 만들어요.\n- Chains: 여러 단계(프롬프트 실행, 후처리 등)를 순서대로 수행하는 파이프라인.\n- Tools/Plugins: 외부 API나 계산기, 검색 엔진 등과의 상호 작용 도구들.\n- Ag
    ents: 상황에 따라 적절한 도구를 호출하고 필요한 경우 대화를 이어가며 목표를 달성하는 자율적 결정자.\n- Memory: 대화 맥락이나 상태를 유지해 연속성 있는 대화를 가능하게 함.\n- Integration/생태계
     다양한 모델과 도구, 서비스와의 연결이 용이하도록 설계됨.\n\n주요 용도\n- 대화형 챗봇 또는 고객 지원 시스템(메모리 포함)\n- 문서 질의응답, 요약, 정보 추출\n- 다단계 추론이 필요한 작업에 도구((
    계산, API 호출, 데이터베이스 질의 등) 활용\n- 코드 생성 및 자동화 워크플로우 구축\n\n장점\n- 모델과 도구를 모듈식으로 쉽고 유연하게 연결 가능\n- 프롬프트 재사용성과 파이프라인 구성의 표준화\n-
     여러 LLM 플랫폼과 도구를 하나의 인터페이스로 다룰 수 있음\n\n참고 및 시작 방법\n- 설치(예시):\n  - Python: pip install langchain\n  - Node.js/TS: npm install langchain\n- 공식 자료:\n  - 공식
    사이트/문서: langchain.com\n  - GitHub 저장소: https://github.com/hwchase17/langchain\n\n간단한 예시 느낌\n- 한 가지 질문에 대해 프롬프트를 채우고 LLM에게 답을 받는 간단한 체인\n- 필요에 따라라
    대화 맥락을 유지하는 메모리, 또는 외부 API를 호출하는 도구를 추가해 복잡한 워크플로우를 만들 수 있습니다.\n\n필요하면 귀하의 시나리오에 맞춘 간단한 예제 코드나 구성 방법을 구체적으로 소개해   드리겠습니다.",
    ...
   }

   AIMessage {
      "id": "chatcmpl-아이디값",
      "content": "일반적으로 \"LangGraph\"는 \"언어(graph)\"를 그래프 형태로 표현하고 다루는 도구나 개념을 가리키는 용어입니다. 정확한 의미는 맥락에 따라 달라질 수 있는데, 보통 다음과 같은 내용을
    포함합니다.\n\n- 무엇인가: 언어 데이터를 노드와 간선으로 표현한 그래프 구조를 다루는 시스템이나 라이브러리/프레임워크를 말합니다. 예를 들면 어휘, 문장 구성 요소, 의미 관계 등을 그래프 형태로
    모델링합니다.\n- 주된 구성요소: \n  - 노드: 단어/구문 요소/의미 단위 등\n  - 간선: 관계(동의어, 상하위 관계, 의존성 관계, 의미 관계 등)\n  - 그래프 타입: 어휘 그래프, 의미 그래프(AMR-like), 구
     의존성 그래프, 다국어 연결 그래프 등\n- 활용 예시: 의미 관계 추출, 기계 번역이나 다국어 자원 연결, 어휘 자원 구축, 문장 분석 및 비교 등\n- 흔한 비교 대상: WordNet(어휘 관계 그래프), AMR(의
    미 표현 그래프), ConceptNet(일반 상식 그래프) 등\n\n특정한 \"LangGraph\"를 말하는 것인지 알고 싶습니다. 예를 들어 어떤 프로젝트나 문서, 서비스 이름으로 쓰였는지 링크나 맥락을 알려주시면 그에  맞춰 더 구체적으로 설명해 드리겠습니다.",
    ...
   }

   AIMessage {
      "id": "chatcmpl-아이디값",
      "content": "LangSmith는 LangChain에서 제공하는 개발자 도구이자 플랫폼으로, LLM(대형 언어 모델) 기반 애플리케이션의 실행 로그를 체계적으로 수집하고 디버깅·평가를 쉽게 할 수 있게 해줍니다. 간
    단히 말해 모델이 주고받은 프롬프트/응답, 도구 호출 등과 같은 실행 정보를 한 곳에서 기록하고 분석하는 도구입니다.\n\n주요 내용\n- 실행 기록 관리: 한 번의 실행(Run) 단위로 입력, 출력, 도구 사용,
     체인 흐름 등 다양한 로그를 수집합니다.\n- 아티팩트와 메타데이터: 프롬프트, 응답, 맥락, 모델 버전 등 구조화된 데이터를 함께 보관할 수 있습니다.\n- 재현성과 공유: 실행 데이터를 버전화하고 팀과
    공유하며, 특정 시점의 상태를 재현해 볼 수 있습니다.\n- 디버깅과 분석: 실패 원인 파악, 에러 트레이스 확인, 입력-출력 쌍의 패턴 분석 등을 도와줍니다.\n- 평가 및 휴먼 인 더 루프: 결과에 대한 평가
    기준(루브릭)을 만들어 사람의 판단을 로그에 연결하고 품질을 개선할 수 있습니다.\n- UI/대시보드: 런 목록을 필터링하고 비교하며, 모델 버전, 프롬프트 유형, 도구 호출 여부 등으로 검색할 수 있습니
    다.\n- LangChain 통합: 주로 LangChain 환경에서 사용하도록 설계되어, 체인 구성과 함께 실행 로깅이 원활합니다.\n\n적용 시나리오\n- 모델 응답 품질 문제를 디버깅하고 프롬프트 엔지니어링의 효과를
    비교하고자 할 때\n- 운영 환경에서 발생하는 에러나 예외를 추적하고 재현하고자 할 때\n- 여러 모델/프롬프트 버전에 대한 성능 비교와 지속적인 개선을 관리할 때\n- 규제나 감사가 필요한 애플리케이션
    에서 실행 이력과 결정 과정을 기록하고자 할 때\n\n시작 방법 (요약)\n- 계정 및 프로젝트 생성: LangSmith 계정을 만들고 프로젝트를 생성합니다.\n- SDK 설치: Python 등으로 LangSmith SDK를 설치합니다
    예: pip install langsmith 등 공식 문서를 참고).\n- 로깅 투입: 애플리케이션 코드에 Run 시작/종료 또는 로깅 래퍼를 사용해 입력, 출력, 메타데이터를 기록합니다.\n- 실행 관찰: LangSmith UI에서 런
    을 열람하고, 필요 시 주석 달기, 루브릭 기반 평가, 데이터 내보내기 등을 수행합니다.\n- 운영 가이드: 데이터 민감 정보는 마스킹/삭제를 적용하고, 필요한 경우 샘플링 등을 통해 로그 양과 비용을 관리
    니다.\n\n참고 및 도움말\n- LangSmith는 LangChain의 생태계와 함께 사용하도록 설계된 도구이므로, LangChain 문서의 LangSmith 섹션도 함께 확인하면 구체적인 API 사용법과 예제가 잘 정리되어 있습니니
    .\n- 사용 시 민감한 데이터의 로깅 여부, 로그 크기 관리, 보안 및 접근 권한 관리에 주의하시기 바랍니다.\n\n원하시면 구체적으로 어떤 환경(예: 파이썬 코드 샘플, 특정 모델/체인 구성)을 기준으로    시작 방법을 단계별로 자세히 안내해 드리겠습니다.",
    ...
   }
*/