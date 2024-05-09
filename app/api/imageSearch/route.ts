import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("image search");
  const requestData = await req.json();
  const foodName = requestData.foodName || "";
  const baseUrl = `https://customsearch.googleapis.com/customsearch/v1?cx=${process.env.GOOGLE_CUSTOM_SEARCH_ID}&searchType=image&key=${process.env.GOOGLE_CUSTOM_SEARCH_API_KEY}`;
  const query = `&q=${foodName}%20food`;

  const response = await fetch(`${baseUrl}${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return NextResponse.json(
    {
      result: await response.json(),
    },
    { status: 200 }
  );
}
