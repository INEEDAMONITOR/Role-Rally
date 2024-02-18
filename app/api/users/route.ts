import { SENDBIRD_API_URL } from "@/app/_lib/sendbird";

export async function POST(request: Request) {
  const res = await fetch(`${SENDBIRD_API_URL}/v3/users`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Api-Token": process.env.API_TOKEN as string,
    },
    body: JSON.stringify(request.body),
  });

  const data = await res.json();
  
  return Response.json({
    message: "User created successfully",
    data,
  });
}