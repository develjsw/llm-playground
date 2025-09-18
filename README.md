## LLM을 서비스에 활용하기 위한 테스트 공간

### 초기 설정
- LLM API Key 발급
  - LLM API를 사용하기 위해서는 반드시 해당 서비스 사이트에서 API Key를 발급 받아야 함
  - LangChain, LangGraph 역시 내부적으로는 이러한 API Key를 활용함
    - [OpenAI API Key](https://platform.openai.com/api-keys) (ChatGPT 제작사)
    - [Anthropic Claude API Key](https://console.anthropic.com/settings/keys)
    - [Google Gemini API Key](https://aistudio.google.com/apikey)
  

- TypeScript로 테스트하기 위한 초기 설정
  - Node.js 설치
    - https://nodejs.org/ko/download
  - 작업 프로젝트 생성
  - TypeScript 관련 패키지 설치
    ```shell
    $ npm install -D tsx
    $ npm install -D typescript @types/node
    ```
  - dotenv 패키지 설치
    ```shell
    $ npm install dotenv
    ```


### RAG에 대한 설명
  - LLM이 자체 학습 데이터만 사용하는 것이 아니라, **외부 데이터 소스(DB, 문서, 검색 등)** 를 조회해 답변 정확도를 높이는 기법
    - EX) '사용자가 지금 날씨 알려줘.'라는 요청을 했을 때, 내부 서비스에서 DB에 있는 사용자의 주소를 포함하여 LLM에게 전달함으로써 '서울시 강남구 개포동'에 날씨를 전달해줄 수 있는 것을 의미함


### LangChain, LangGraph에 대한 설명
  - LangChain, LangGraph : AI를 더 편하게 사용할 수 있도록 여러가지 기능을 제공하는 프레임워크
  - LangChain : ★ 충분히 학습 후 작성 예정 ★
  - LangGraph : ★ 충분히 학습 후 작성 예정 ★


### LangSmith에 대한 설명
  - LLM을 사용중인 Application의 시각화 모니터링 플랫폼으로 DataDog를 떠올리면 이해가 쉬움