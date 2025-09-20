import "dotenv/config";
import z from "zod";
import { createAgent, tool } from "langchain";

// 실제로는 운영중인 내부 서비스의 DB에서 가져온 데이터라 가정하고 진행
const users = [
    { userId: 10, name: '홍길동', address: '서울시 강남구 개포동' },
    { userId: 20, name: '이몽룡', address: '서울시 종로구 청운동' },
];

const getUserAddress = tool(
    (_, config) => {
        const { user_id } = config.context as { user_id: number }
        console.log("user_id", user_id);

        const user = users.find(user => user.userId === user_id);
        if (!user) {
            return "해당 유저 정보를 찾을 수 없습니다.";
        }

        return user.address;
    },
    {
        name: "get_user_address",
        description: "사용자 ID를 기반으로 주소 정보가 필요할 때 사용",
        schema: z.object({}),
    }
);

// const response1 = await getUserAddress.invoke({}, { context: { user_id: 1 } });
// // 결과 값 : 해당 유저 정보를 찾을 수 없습니다.
// const response2 = await getUserAddress.invoke({}, { context: { user_id: 10 } });
// // 결과 값 : 서울시 강남구 개포동

const agent = createAgent({
    model: "openai:gpt-4o-mini",
    tools: [getUserAddress]
});

console.log(
    await agent.invoke(
        {
            messages: [
                { role: "user", content: "우리 동네에서 가장 가까운 경찰서 위치 알려줘." }
            ]
        },
        {
            //context: { user_id: 10 }
            //context: { user_id: 20 }
            context: { user_id: 999999 }
        }
    )
);
/*
    [ LLM 응답 결과 값 확인 ]

    [질문1] '우리 동네에서 가장 가까운 경찰서 위치 알려줘.' (유저 10번에 대한 정보 같이 전달)
        AIMessage {
            "id": "ID값",
            "content": "서울시 강남구 개포동 근처에 있는 가장 가까운 경찰서는 \"강남경찰서\"입니다. 강남경찰서는 개포동에서 비교적 가까운 위치에 있으며, 주소는 다음과 같습니다:\n\n- **주소:** 서울특시 강남구 역삼로 30길 6 (역삼동)\n\n가는 길은 대중교통이나 자가용을 이용할 수 있으며, 추가적인 정보를 원하시면 확인해보세요!",
        }
    [질문2] '우리 동네에서 가장 가까운 경찰서 위치 알려줘.' (유저 20번에 대한 정보 같이 전달)
        AIMessage {
            "id": "ID값",
            "content": "서울시 종로구 청운동에 가장 가까운 경찰서는 종로경찰서입니다. 종로경찰서는 청운동에서 가까운 위치에 있으며, 주소는 서울특별시 종로구 종로 1가 1입니다. 추가적인 정보나 다른 도이 필요하시면 말씀해 주세요!",
        }
    [질문3] '우리 동네에서 가장 가까운 경찰서 위치 알려줘.' (유저 999999번에 대한 정보 같이 전달)
        AIMessage {
            "id": "ID값",
            "content": "죄송하지만, 사용자 정보를 찾을 수 없어 현재 위치를 확인할 수 없습니다. 근처의 경찰서 위치를 알고 싶으시다면, 현재 위치를 알려주시면 도와드리겠습니다.",
        }
*/
