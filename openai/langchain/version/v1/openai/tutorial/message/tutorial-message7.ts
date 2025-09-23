import "dotenv/config";
import { initChatModel, tool } from "langchain";
import { z } from "zod";

const model = await initChatModel("openai:gpt-5-nano");

// 외부 API를 통해 가져온 오늘 날씨 정보라고 가정
const todayWeatherApiResponse = { date: "2025-09-23", weather: "맑음", averageTemperature: "18°c~26°c" }

const getTodayWeather = tool((_) =>
    {
        if (!todayWeatherApiResponse) {
            return "오늘 날짜의 날씨를 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요.";
        }
        return todayWeatherApiResponse.weather
    },
    {
        name: "get_today_weather",
        description: "날씨를 물어보는 경우에 오늘 날씨 정보를 전달해주는 기능",
        schema: z.object({})
    }
)

const modelWithTools = model.bindTools([getTodayWeather]);

const response = await modelWithTools.invoke("날씨좀 알려줘.");
console.log(response);

for (const toolCall of response.tool_calls) {
    console.log(`Name : ${toolCall.name}`);
    console.log(`Args : ${JSON.stringify(toolCall.args)}`);
    console.log(`Id : ${toolCall.id}`);
}