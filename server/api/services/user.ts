import { SENDBIRD_API_URL } from "../external/sendbird";

export const handleCreateUser = async (payload: any) => {
  const res = await fetch(`${SENDBIRD_API_URL}/users`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Api-Token": process.env.API_TOKEN as string,
    },
    body: JSON.stringify(payload),
  });
  return await res.json();
};

export const handleFetchUser = async (userId: string) => {
  const res = await fetch(`${SENDBIRD_API_URL}/users/${userId}`, {
    headers: {
      "Api-Token": process.env.API_TOKEN as string,
    },
  });

  return await res.json();
};