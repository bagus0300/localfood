import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  if (!configuration.apiKey) {
    return NextResponse.json(
      {
        error: {
          message:
            "OpenAI API key not configured, please follow instructions in README.md",
        },
      },
      { status: 500 }
    );
  }
  const requestData = await req.json();
  const location = requestData.location || "";

  if (location.trim().length === 0) {
    return NextResponse.json(
      {
        error: {
          message: "Please enter a valid location",
        },
      },
      { status: 400 }
    );
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: 'system',
          content: `
          When a user gives you a location recommend 5 local foods from 
          the location with a 1 sentence description. Include the coordinates 
          of the user's location. Return as a JSON in the 
          following format:
          {
          coordinates: {
            lat: number,
            lng: number
          },
          local_foods: [{name: name, description: description}]
          } `
        },
        {
          role: "user",
          content: `${location}`,
        },
      ],
    });
    console.log(completion.data);
    
    // console.log(completion.data.choices[0].message);
    // res.status(200).json({ result: completion.data.choices[0].text });
    return NextResponse.json(
      {
        result:
          completion.data.choices[0].message !== undefined
            ? completion.data.choices[0].message.content
            : null,
      },
      { status: 200 }
    );
    // res.status(200).json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    console.log("GPT RESPONSE ERROR");
    // Consider adjusting the error handling logic for your use case
    // if (error.response) {
    //   console.error(error.response.status, error.response.data);
    //   res.status(error.response.status).json(error.response.data);
    // } else {
    //   console.error(`Error with OpenAI API request: ${error.message}`);
    //   res.status(500).json({
    //     error: {
    //       message: 'An error occurred during your request.',
    //     }
    //   });
    // }
  }
}
