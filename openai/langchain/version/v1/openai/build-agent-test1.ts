import "dotenv/config";
import z from "zod";
import { createAgent, MemorySaver, tool } from "langchain";
//import { initChatModel } from "langchain/chat_models/universal";

// 1. 시스템 프롬프트 정의
const systemPrompt = `당신은 부동산 전문가입니다.
다음 2가지 도구를 사용할 수 있습니다.

- get_top_5_deals_by_apartment: 특정 아파트 매물의 매매 top 5를 가져옵니다.
- get_top_5_lease_by_apartment: 특정 아파트 매물의 임대 top 5를 가져옵니다.

사용자가 특정 아파트 이름을 말하면서 시세에 대해 물어볼 경우, 매매/임대를 파악하여 get_top_5_deals_by_apartment, get_top_5_lease_by_apartment 도구를 사용하여 답변하세요.  
`

// 2. DB 데이터 조회 (매매, 전세만 있다고 가정하고 진행)
const apartments = [
    { complexId: 10111, name: '벽산아파트', dealPrice: 1200000000, leasePrice: 0, area: '84m²' },
    { complexId: 10111, name: '벽산아파트', dealPrice: 0, leasePrice: 350000000, area: '84m²' },
    { complexId: 10111, name: '벽산아파트', dealPrice: 0, leasePrice: 360000000, area: '84m²' },
    { complexId: 10111, name: '벽산아파트', dealPrice: 1230000000, leasePrice: 0, area: '84m²' },
    { complexId: 10111, name: '벽산아파트', dealPrice: 0, leasePrice: 370000000, area: '84m²' },
    { complexId: 10111, name: '벽산아파트', dealPrice: 1300000000, leasePrice: 0, area: '84m²' },
    { complexId: 10111, name: '벽산아파트', dealPrice: 1230000000, leasePrice: 0, area: '84m²' },
    { complexId: 10111, name: '벽산아파트', dealPrice: 1270000000, leasePrice: 0, area: '84m²' },
    { complexId: 10111, name: '벽산아파트', dealPrice: 0, leasePrice: 330000000, area: '84m²' },
    { complexId: 10111, name: '벽산아파트', dealPrice: 0, leasePrice: 350000000, area: '84m²' },
    { complexId: 10111, name: '벽산아파트', dealPrice: 1330000000, leasePrice: 0, area: '84m²' },
    { complexId: 10111, name: '벽산아파트', dealPrice: 0, leasePrice: 360000000, area: '84m²' },
    { complexId: 10111, name: '벽산아파트', dealPrice: 0, leasePrice: 380000000, area: '84m²' },
];

// 3-1. 도구 생성 (단지별 매매 최고가 TOP 5 가져오기)
const getTop5DealsByApartment = tool(({ apartment_name }) =>
    {
        const apartmentDeals = apartments.filter((apartment) => apartment.name === apartment_name && apartment.dealPrice > 0);
        if (!apartmentDeals.length) {
            return "해당 아파트 단지의 매매 데이터가 존재하지 않습니다.";
        }

        return apartmentDeals
            .sort((a, b) => b.dealPrice - a.dealPrice)
            .slice(0, 5);
    },
    {
        name: "get_top_5_deals_by_apartment",
        description: "단지별 매매 최고가 TOP5 가져오기",
        // schema는 tool의 매개변수의 타입을 정해주는 것
        schema: z.object({
            //apartment_name: z.string() // TODO : 해당 값을 넣으면 Error로 깨지고 안넣으면 tool을 호출할 때, argument 값인 apartment_name 값을 넘기지 않아서 빈객체로 넘어가는 이슈 발생
        }),
        //required: ["apartment_name"]
    }
)

// 3-2. 도구 생성 (단지별 임대 최고가 TOP 5 가져오기 - 전세만 있다고 가정하고 진행)
const getTop5LeaseByApartment = tool(({ apartment_name }) =>
    {
        const apartmentLeases = apartments.filter((apartment) => apartment.name === apartment_name && apartment.leasePrice > 0);
        if (!apartmentLeases.length) {
            return '해당 아파트 단지의 임대 데이터가 존재하지 않습니다.';
        }

        return apartmentLeases
            .sort((a, b) => b.leasePrice - a.leasePrice)
            .slice(0, 5)
    },
    {
        name: "get_top_5_lease_by_apartment",
        description: "단지별 임대 최고가 TOP5 가져오기",
        schema: z.object({
            //apartment_name: z.string()  // TODO : 해당 값을 넣으면 Error로 깨지고 안넣으면 tool을 호출할 때, argument 값인 apartment_name 값을 넘기지 않아서 빈객체로 넘어가는 이슈 발생
        }),
        //required: ["apartment_name"]
    }
);

// console.log(
//     await getTop5DealsByApartment.invoke({}, { context: { apartment_name: "벽산아파트" } })
// );
// console.log(
//     await getTop5LeaseByApartment.invoke({}, { context: { apartment_name: "벽산아파트" } })
// );
// console.log(
//     await getTop5DealsByApartment.invoke({ apartment_name: "벽산아파트" })
// );
// console.log(
//     await getTop5LeaseByApartment.invoke({ apartment_name: "벽산아파트" })
// );
// console.log(
//     await getTop5DealsByApartment.invoke({ complex_id: 10111 })
// );
// console.log(
//     await getTop5LeaseByApartment.invoke({ complex_id: 10111 })
// );

// 4. 모델 구성
// const model = await initChatModel(
//     "openai:gpt-4o-mini",
//     { temperature: 0 }
// );

// 5. 응답 형식 정의
const responseFormat = z.object({
    apartmentName: z.string(),
    top5Deals: z.array(z.object({
        price: z.number(),
        area: z.string()
    })),
    top5Leases: z.array(z.object({
        price: z.number(),
        area: z.string()
    }))
});

// 6. 메모리 추가 (대화 내용을 기억하도록 설정)
//const checkpointer = new MemorySaver();

// 7. 에이전트 조립
const agent = createAgent({
    model: "openai:gpt-4o-mini",
    prompt: systemPrompt,
    tools: [getTop5DealsByApartment, getTop5LeaseByApartment],
    responseFormat,
    //checkpointer
});

// const config = {
//     configurable: { thread_id: "1" },
//     context: { user_id: "1001" }
// }

const response = await agent.invoke({
    messages: [
        {
            role: "user",
            content: [{ type: "text", text: "벽산아파트 요새 시세가 어떻게 되니?" }],
        }
    ],
});

console.log(response);
