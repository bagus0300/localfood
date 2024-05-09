import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("RESTAURANT DETAILS REQUEST")
  const requestData = await req.json();
  const placeId = requestData.placeId 

  const baseUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const place = `&place_id=${placeId}`;
  const fields = `&fields=url`;

  const response = await fetch(`${baseUrl}${place}${fields}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json(
    {
      result: await response.json(),
    },
    { status: 200 }
  );
}
