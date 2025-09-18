### LangChain

- 개요
  - LangChain은 LLM을 활용한 애플리케이션을 빠르게 개발할 수 있도록 도와주는 프레임워크로, 10줄 미만의 코드로 OpenAI, Anthropic, Google 등 을 사용하여 에이전트를 개발할 수 있음 (https://docs.langchain.com/oss/javascript/langchain/overview)


- 버전
  - 2025년 9월 18일 기준 최신 안정 버전은 v0.3
  - 차세대 버전인 v1은 활발히 개발 및 프리뷰 단계 진행 중


- 제공 언어
  - 현재 Python과 JavaScript/TypeScript를 지원하고 있음


- LLM API Key 발급 후 환경 변수 설정
  - LangChain은 각 LLM 패키지별로 기본 환경 변수명을 설정해두었음
  - 프로젝트 루트에 `.env` 파일을 생성하고 아래와 같이 설정
    ```env
    OPENAI_API_KEY=발급받은 키 입력
    ANTHROPIC_API_KEY=발급받은 키 입력
    GOOGLE_API_KEY=발급받은 키 입력
    ```
  - 위에와 같이 기본 키명을 사용하면 바로 동작
  - 다른 변수명을 쓰려면 apiKey 옵션을 직접 지정해야 함
    ```ts
    import { ChatOpenAI } from "@langchain/openai";

    // 기본 키 이름 사용 (OPENAI_API_KEY)
    const model = new ChatOpenAI({ model: "gpt-4o-mini" });
    
    // 커스터마이징 키 사용
    const customModel = new ChatOpenAI({
      model: "gpt-4o-mini",
      apiKey: process.env.MY_OPENAI_KEY,
    });
    ```
    ```ts
    import { ChatAnthropic } from "@langchain/anthropic";

    // 기본 키 이름 사용 (ANTHROPIC_API_KEY)
    const model = new ChatAnthropic({ model: "claude-3-opus-20240229" });
    
    // 커스터마이징 키 사용
    const customModel = new ChatAnthropic({
      model: "claude-3-opus-20240229",
      apiKey: process.env.MY_ANTHROPIC_KEY,
    });
    ```
    ```ts
    import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

    // 기본 키 이름 사용 (GOOGLE_API_KEY)
    const model = new ChatGoogleGenerativeAI({ model: "gemini-1.5-pro" });
    
    // 커스터마이징 키 사용
    const customModel = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-pro",
      apiKey: process.env.MY_GOOGLE_KEY,
    });
    ```

- TypeScript 코드 실행
  - 반드시 프로젝트 루트 디렉토리에서 실행(env 환경변수 값 읽어 올 수 있도록)
    ```shell
    프로젝트 루트 디렉토리 위치$ npx tsx [실행시킬 파일 경로 + 파일명]
    
    EX) llm-playground$ npx tsx openai/langchain/version/v1/openai/create-an-agent.ts  
    ```