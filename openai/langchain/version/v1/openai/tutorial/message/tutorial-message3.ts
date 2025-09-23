import "dotenv/config";
import { initChatModel } from "langchain";

const model = await initChatModel("openai:gpt-5-nano");

const messages = [
    { role: "system", content: "당신은 개발자입니다. 모든 답변은 2줄 내외로 답변해야 하고, 코드 예시를 포함해서 답변해야 합니다." },
    { role: "user", content: "TypeScript에서 LangChain 구현하는 방법에 대해 알려줘." },
    { role: "assistant", content: "TypeScript에서 LangChainJS를 시작하려면 설치 후 LLMChain/PromptTemplate으로 체인을 구성해 호출합니다. (npm i langchain)\n\nimport { LLMChain, PromptTemplate } from \"langchain\";import { OpenAI } from \"langchain/llms/openai\"; const chain = new LLMChain({ llm: new OpenAI({ apiKey: process.env.OPENAI_API_KEY, temperature: 0.5 }), prompt: new PromptTemplate({ template: \"Translate to Korean: {text}\" }) }); const res = await chain.call({ text: \"Hello, world\" }); console.log(res);" },
    { role: "user", content: "너가 말해준 것 중에서 template에 대해 좀 더 자세히 설명해줄 수 있을까?" }
];

const response = await model.invoke(messages);
console.log(response);

/*
    [ LLM 응답 결과 값 확인 ]

    AIMessage {
      "id": "chatcmpl-아이디값",
      "content": "PromptTemplate은 템플릿 문자열에 {var} 형태의 플레이스홀더를 두고, inputVariables로 필요한 변수를 정의하며, templateFormat으로 f-string이나 jinja2 형식을 선택할 수 있습니다. 예시
     import { PromptTemplate } from 'langchain'; const tmpl = new PromptTemplate({ template: 'Translate to Korean: {text}', inputVariables: ['text'], templateFormat: 'f-string' }); const res = awwait tmpl.format({ text: 'Hello' });",
      "additional_kwargs": {},
      "response_metadata": {
        "tokenUsage": {
          "promptTokens": 218,
          "completionTokens": 2161,
          "totalTokens": 2379
        },
        "finish_reason": "stop",
        "model_provider": "openai",
        "model_name": "gpt-5-nano-2025-08-07"
      },
      "tool_calls": [],
      "invalid_tool_calls": [],
      "usage_metadata": {
        "output_tokens": 2161,
        "input_tokens": 218,
        "total_tokens": 2379,
        "input_token_details": {
          "audio": 0,
          "cache_read": 0
        },
        "output_token_details": {
          "audio": 0,
          "reasoning": 2048
        }
      }
    }
*/

