import { NextResponse } from "next/server";

export const SENDBIRD_API_URL = `https://api-${process.env.NEXT_PUBLIC_SENDBIRD_APP_ID}.sendbird.com`;

const createUser = async (payload: any) => {
  try {
    const res = await fetch(`${SENDBIRD_API_URL}/v3/users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Api-Token": process.env.API_TOKEN as string,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    return NextResponse.json(
      {
        message: "Sendbird user created successfully",
        data,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: "Sendbird API error"
      },
      {
        status: 500
      }
    );
  }
};

const fetchUser = async (userId: string) => {
  try {
    const res = await fetch(`${SENDBIRD_API_URL}/v3/users/${userId}`, {
      headers: {
        "Api-Token": process.env.API_TOKEN as string,
      },
    });

    const data = await res.json();

    return NextResponse.json(
      {
        data,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: "Sendbird API error"
      },
      {
        status: 500
      }
    );
  }
};

export const sendbirdRequests = {
  createUser,
  fetchUser,
};