import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("NEARBY SEARCH REQUEST")

  const requestData = await req.json();
  const foodName = requestData.foodName || "";
  const lat = requestData.lat;
  const lng = requestData.lng;
  const radius = requestData.radius;

  const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const query = `&keyword=${foodName}`;
  const location = `&location=${lat}%2C${lng}`;
  const rad = `&radius=${radius}`;

  const response = await fetch(`${baseUrl}${query}${location}${rad}`, {
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
