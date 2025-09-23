## message

- 메세지는 LangChain 모델의 기본 컨텍스트 단위
- 메세지는 모델의 입력과 출력을 나타내며, LLM과 상호작용 할 때 대화 상태를 나타내는 데 필요한 콘텐츠와 메타데이터를 모두 담고 있음


- 메세지는 다음을 포함하는 객체임
  - Role : 메세지 유형을 식별함 (EX. system, user)
  - Content : 메세지의 실제 컨텐츠(텍스트, 이미지, 오디오, 문서 등)를 나타냄
  - Metadata : 응답 정보, 메세지 ID, 토큰 사용 등의 선택 필드


- LangChain은 모든 모델 제공자에서 작동하는 표준 메세지 유형을 제공하여 호출되는 모델에 관계없이 일관된 동작을 보장함

### 기본 사용법
- 메세지를 사용하는 가장 간단한 방법은 메세지 객체를 생성하고 호출할 때 모델을 전달하는 것임
    ```ts
    import { initChatModel, HumanMessage, SystemMessage } from "langchain";
  
    const model = await initChatModel("openai:gpt-5-nano");
    
    const systemMessage = new SystemMessage("당신은 개발자입니다. 개발에 관련된 도움을 주세요.");
    const humanMessage = new HumanMessage("요새 신기술은 뭐가 있니?");
  
    const messages = [systemMessage, humanMessage];
  
    const response = await model.invoke(messages); // Return AIMessage
    ```

### 텍스트 프롬프트
- 텍스트 프롬프트는 문자열이므로 대화 기록을 보관할 필요가 없는 간단한 생성 작업에 적합함
    ```ts
    const response = await model.invoke("개발자 직업 종류에는 뭐가 있니?");
    ```
    - 다음과 같은 경우 텍스트 프롬프트를 사용
      - 단일 독립형 요청이 있는 경우
      - 대화 내역이 필요없는 경우
      - 최소한의 코드 복잡성을 원하는 경우

### 메세지 프롬프트
- 메세지 객체 목록을 제공하여 모델에 메세지 목록을 전달할 수 있음
    ```ts
    import { SystemMessage, HumanMessage, AIMessage } from "langchain";
  
    // 모델 설정 생략..
  
    const messages = [
        // SystemMessage는 모델에게 역할·규칙·지침을 부여함
        // HumanMessage는 실제 사람이 입력한 발화를 의미함
        // AIMessage는 과거 AI가 했던 응답들을 기록하는 역할을 함
        new SystemMessage("당신은 개발자입니다."),
        new HumanMessage("요새 유행하는 개발용어 1가지만 추천해줘"),
        new AIMessage("GitOps\n\n설명: Git을 선언적 구성의 단일 진실 소스로 삼아 인프라와 배포 파이프라인을 관리하는 운영 방식. 특히 Kubernetes 등에서 널리 채택되며, 자동화, 재현성, 롤백 용이성이 큰 장으로 부각되고 있습니다."),
        new HumanMessage("DevOps와 비슷한 개념인거야?")
    ];
  
    const response = await model.invoke(messages);
    ```
    - 다음과 같은 경우 메세지 프롬프트 사용
      - 여러 차례 대화 관리
      - 다중 모드 컨텐츠(이미지, 오디오, 파일) 작업
      - 시스템 지침 포함

### 사전 형식
- OpenAI 채팅 완성 형식으로 메세지를 직접 지정할 수도 있음
    ```ts
    const messages = [
        // system은 SystemMessage과 동일한 기능
        // user는 HumanMessage와 동일한 기능
        // assistant는 AIMessage와 동일한 기능
        { role: "system", content: "당신은 개발자입니다. 모든 답변은 2줄 내외로 답변해야 하고, 코드 예시를 포함해서 답변해야 합니다." },
        { role: "user", content: "TypeScript에서 LangChain 구현하는 방법에 대해 알려줘." },
        { role: "assistant", content: "TypeScript에서 LangChainJS를 시작하려면 설치 후 LLMChain/PromptTemplate으로 체인을 구성해 호출합니다. (npm i langchain)\n\nimport { LLMChain, PromptTemplate } from \"langchain\";import { OpenAI } from \"langchain/llms/openai\"; const chain = new LLMChain({ llm: new OpenAI({ apiKey: process.env.OPENAI_API_KEY, temperature: 0.5 }), prompt: new PromptTemplate({ template: \"Translate to Korean: {text}\" }) }); const res = await chain.call({ text: \"Hello, world\" }); console.log(res);" },
        { role: "user", content: "너가 말해준 것 중에서 template에 대해 좀 더 자세히 설명해줄 수 있을까?" }
    ];
    ```

### 메세지 유형
- System Message : SystemMessage모델의 행동을 준비하는 초기 지침 세트를 나타냄. 시스템 메시지를 사용하여 분위기를 설정하고, 모델의 역할을 정의하고, 응답 지침을 설정할 수 있음
  ```ts
  import { SystemMessage, HumanMessage, AIMessage } from "langchain";

  // 모델 설정 생략..
  
  const systemMessage = new SystemMessage("당신은 개발자입니다. 모든 답변은 2줄 내외로 답변해야 하고, 코드 예시를 포함해서 답변해야 합니다.");
  
  const messages = [
    systemMessage,
    new HumanMessage("TypeScript에서 LangChain 구현하는 방법에 대해 알려줘.")
  ];
  
  const response = await model.invoke(messages);
  ```
  
  ```ts
  import { SystemMessage, HumanMessage } from "langchain";
  
  // 모델 설정 생략..
  
  const systemMessage = new SystemMessage(`당신은 개발자입니다.\n
  모든 답변은 2줄 내외로 답변해야 하고,\n
  코드 예시를 포함해서 답변해야 합니다.\n
  `);
  
  const messages = [
    systemMessage,
    new HumanMessage("TypeScript에서 LangChain 구현하는 방법에 대해 알려줘.")
  ];
  
  const response = await model.invoke(messages);
  ```
- Human Message : 사용자 입력과 상호작용을 나타냄. 텍스트, 이미지, 오디오, 파일 및 기타 다양한 멀티모달 콘텐츠를 포함할 수 있음
  - 텍스트 컨텐츠
    ```ts
    // 모델 설정 생략..
    
    const humanMessage = new HumanMessage("TypeScript에서 LangChain 구현하는 방법에 대해 알려줘.");
    
    const response = await model.invoke([humanMessage]);
    ```
    ```ts
    // 모델 설정 생략..
    
    const response = await model.invoke("TypeScript에서 LangChain 구현하는 방법에 대해 알려줘.");
    ```
  - 메세지 메타데이터
    ```ts
    const humanMessage = new HumanMessage({
        content: "안녕~",
        name: "홍길동", // 멀티 유저/멀티 에이전트 시스템에서 이 메세지가 누구의 말인지 구분하는 용도로 사용함 
        id: "message_12345" // 개발자가 직접 지정하는 값으로 별도로 로그 적재하고 추적할 수 있도록 만들기 위한 기능
    });
    ```
- AI Message : 모델 호출의 출력을 나타냄. 여기에는 나중에 액세스할 수 있는 다중 모드 데이터, 도구 호출 및 공급자별 메타데이터가 포함될 수 있음
    ```ts
    // 모델 설정 생략..
  
    const response = await model.invoke("개발자는 보통 무슨일을 하니?");

    (response instanceof AIMessage)
        ? console.log("AIMessage 타입 일치")
        : console.log("AIMessage 타입 불일치")
    ```
- Tool Message : 모델이 도구 호출을 하면 AI 메시지에 포함됨

