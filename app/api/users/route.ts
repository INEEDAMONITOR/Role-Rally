import { sendbirdRequests } from "@/app/_lib/sendbird";

export async function POST(req: Request) {
  await sendbirdRequests.createUser(req);
}