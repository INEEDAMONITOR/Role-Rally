import { SENDBIRD_API_URL } from "@/app/_lib/sendbird";

interface Params {
    userId: string;
}

export async function GET(_: Request, { params }: { params: Params }) {
  const res = await fetch(`${SENDBIRD_API_URL}/v3/users/${params.userId}`, {
    headers: {
      "Api-Token": process.env.API_TOKEN as string,
    },
  });

  const data = await res.json();

  return Response.json({
    data,
  });
}