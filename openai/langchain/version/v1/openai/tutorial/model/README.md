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

### Key Methods
- invoke : 메시지를 입력하면 모델이 전체 응답을 생성해 반환
- stream : 모델 응답을 실시간으로 스트리밍하며 받음
- batch : 여러 요청을 묶어 한 번에 처리 → 효율적인 대량 처리에 적합

### Parameters
- model* (string, required) : 사용할 모델 이름/식별자
- apiKey (string) : 모델 공급사 인증용 키 (환경 변수로 주로 설정)
- temperature (number) : 출력의 무작위성 (창의성) 조절
  - 높을수록 창의적, 낮을수록 결정적/예측 가능
- stop (string[]) : 모델이 출력을 중단해야 하는 문자열 시퀀스
- timeout (number) : 응답 대기 최대 시간 (초 단위)
- maxTokens (number) : 응답 토큰 수 제한 → 출력 길이 제어
- maxRetries (number) : 실패 시 재시도 최대 횟수 (ex. 네트워크 타임아웃, Rate limit)

### invoke
- 가장 간단하게 모델을 호출하는 방법은 invoke()를 사용하여 단일 메시지 또는 메시지 목록을 전달하는 것 
  ```ts
  import { initChatModel } from "langchain";
  
  const model = await initChatModel("openai:gpt-5-nano");
  
  const response = await model.invoke("langchain에 대해서 설명해줄래? 1줄로 짧게 요약해서 설명해줘.");
  ```
- 모델에 메시지 목록을 전달하면 대화 기록을 표현할 수 있으며, 각 메시지는 발신자 역할(role) 정보를 포함함
  ```ts
  import { HumanMessage, AIMessage, SystemMessage } from "langchain";
  
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
  ```
### stream
- 대부분의 모델은 출력이 생성되는 동안 스트리밍 방식으로 결과를 전달할 수 있음
- 스트리밍은 응답을 점진적으로 표시하기 때문에, 특히 긴 응답일 경우 사용자 경험을 크게 향상시킬 수 있음
- stream()을 호출하면 생성된 출력 조각 (chunk) 을 순차적으로 반환하는 iterator가 리턴되고, 이를 loop로 처리하면 각 조각을 실시간으로 다룰 수 있음 
  ```ts
  import { initChatModel } from "langchain";

  const model = await initChatModel("openai:gpt-5-nano");
  
  const stream = await model.stream("개발자들이 많이 사용하는 언어 TOP5는 뭐가 있니?");
  
  for await (const chunk of stream) {
      console.log(chunk.text);
  }
  ```
- invoke()는 모델이 전체 응답을 다 생성한 뒤 하나의 AIMessage 객체로 반환해줬지만, stream()은 모델이 응답을 생성하는 도중에 여러개의 AIMessageChunk를 순차적으로 반환하는 방식으로 동작함
- 각 chunk는 출력의 일부만 담고 있음
  - ex)
    ~~~
    주
    주제
    주제에
    주제에 따
    주제에 따라
    주제에 따라 기준
    ...
    ~~~
- chunk 합치기
  - 스트리밍으로 받은 여러 AIMessageChunk 들은 concat()을 통해 하나의 완성된 메세지로 모을 수 있음
    ```ts
    import { AIMessageChunk, initChatModel } from "langchain";

    const model = await initChatModel("openai:gpt-5-nano");
  
    const stream = await model.stream("개발자들이 많이 사용하는 언어 TOP5는 뭐가 있니?");
  
    let full: AIMessageChunk | null = null;
    for await (const chunk of stream) {
        full = full ? full.concat(chunk) : chunk;
        console.log(full.text);
    }
    
    // 다
    // 다양
    // 다양한
    // 다양한 지
    // 다양한 지표
    // 다양한 지표에
    // 다양한 지표에 따라
    // ...    
  
    console.log(full.contentBlocks);
    // [{ type: 'text', text: '다양한 지표에 따라 다르지만...' }]
    ```

### batch
- 여러개의 독립된 요청을 한번에 묶어서(model에 동시에 보내서) 처리하는 방식
  - 독립적인 요청 : 서로 연관이 없는 질문이나 입력들 EX) "서울의 날씨 알려줘", "파리 인구는 어느정도 되니?", "현재 미국 대통령이 누구니?"
  - 병렬 처리 : 요청들을 하나씩 순서대로 보내는 대신(model.invoke 방식), 묶어서 한 번에 병렬 처리하는 방식
- 장점 : 
  - 성능 향상 : 동시에 병렬 처리하기 때문에 응답 시간이 크게 향상됨
  - 비용 절감 : API 호출마다 부가적인 네트워크/요청 비용 발생하는 데 이 부분이 줄어들어 비용이 절감됨

  ```ts
  import { initChatModel } from "langchain";
  
  const model = await initChatModel("openai:gpt-5-nano");
  
  const responses = await model.batch([
      "백엔드 개발자는 어떤 언어들을 사용하나요?",
      "프론트엔드 개발자는 어떤 언어들을 사용하나요?",
      "LangChain은 무엇인가요?",
      "LangGraph는 무엇인가요?",
      "LangSmith는 무엇인가요?"
  ]);
  /*
    [
        AIMessage {},
        AIMessage {},
        AIMessage {},
        AIMessage {},
        AIMessage {}
    ]
  */
  
  for (const response of responses) {
      console.log(response);
  }
  /*
      AIMessage {},
      AIMessage {},
      AIMessage {},
      AIMessage {},
      AIMessage {}
  */
  ```
  - 병렬처리 가능 개수 설정
    ```ts
    const model = await initChatModel("openai:gpt-5-nano");

    const questions = [
        "백엔드 개발자는 어떤 언어들을 사용하나요?",
        "프론트엔드 개발자는 어떤 언어들을 사용하나요?",
        "LangChain은 무엇인가요?",
        "LangGraph는 무엇인가요?",
        "LangSmith는 무엇인가요?"
    ];
  
    const responses = await model.batch(
        questions,
        {
            maxConcurrency: 3 // 병렬처리 가능 개수 설정
        }
    );
  
    for (const response of responses) {
        console.log(response);
    }
    /*
        AIMessage {},
        AIMessage {},
        AIMessage {},
        AIMessage {},
        AIMessage {}
    */
    ```