### LangChain v1 사용 가이드 (Node.js & TypeScript 환경 기준)

#### LangChain 패키지 설치 (v1/개발·프리뷰 버전)
- https://www.npmjs.com/package/langchain (Node.js v18 이상 + ESM 환경)
    ```shell
    # npm 기준 LangChain v1.0(개발/프리뷰 버전) 설치
    $ npm install langchain@next
    
    # pnpm 기준 LangChain v1.0(개발/프리뷰 버전) 설치
    $ pnpm add langchain@next
    ```

#### LangChain에서 제공하는 LLM 연결용 패키지 설치 (v1/프리뷰, @next 지정 필수)
- Anthropic(Claude) : https://www.npmjs.com/package/@langchain/anthropic
- OpenAI : https://www.npmjs.com/package/@langchain/openai
    ```shell
    # npm 기준 (v1.0/프리뷰 버전)
    $ npm install @langchain/anthropic@next 
    $ npm install @langchain/openai@next
  
    # pnpm 기준 (v1.0/프리뷰 버전)
    $ pnpm add @langchain/anthropic@next
    $ pnpm add @langchain/openai@next
    ```