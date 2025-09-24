import "dotenv/config";
import { initChatModel } from "langchain";

const model = await initChatModel("openai:gpt-5-nano");

const stream = await model.stream("개발자들이 많이 사용하는 언어 TOP5는 뭐가 있니?");

for await (const chunk of stream) {
    //console.log(chunk.text);
}

/*
    [ LLM 응답 결과 값 확인 ]

    다
    양
    한
     지
    표
    에
     따라
     다
    르
    지만
    ,
     보
    통
     아래
     정도
    의
     언
    어
    들이
     개발
    자
    들이
     가장
     많이
     씁
    니다
    .


    -
     대표
    적
     조사
    /
    지
    표
    를
     기준
    으로
     한
     상
    위

    5
    개

     -
     Java
    Script
     -
     Python
     -
     Java
     -
     C
    #
     -
     Type
    Script
    ...
*/