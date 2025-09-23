## model

- **LLM (대규모 언어 모델)** 은 텍스트를 해석하고 생성하는 기본 능력을 가진 엔진
- 최신 모델은 다음과 같은 확장 기능을 제공함
  - **Tool Calling** : 외부 도구 (DB 쿼리, API 호출 등) 를 실행하고 그 결과를 응답에 활용
  - **Structured Output** : 응답이 미리 정의된 형식을 따르도록 제한
  - **MultiModal** : 텍스트뿐만 아니라 이미지, 오디오, 비디오 등 다양한 입력/출력을 지원
  - **Reasoning** : 여러 단계를 거친 추론 수행 (지원 여부와 수준은 공급업체별로 상이 - OpenAI, Claude, Gemini 등)

### 기본 사용법
- LangChain에서 모델을 사용하는 가장 간단한 방법은 **initChatModel**을 사용하여 선택한 공급자로부터 모델을 초기화 하는 것
    ```ts
    import { initChatModel } from "langchain";
  
    const model = await initChatModel("openai:gpt-5-nano");
    const response = await model.invoke("langchain에 대해서 설명해줄래?");
    ```

