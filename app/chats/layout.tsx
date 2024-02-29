"use client";

import { ReactNode, useEffect, useState } from "react";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";

export default function ChatsLayout({
  children,
}: {
  children: ReactNode
}) {
  const [accessToken, setAccessToken] = useState();
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    let itemValue = localStorage.getItem("sendbirdUserId");

    if (!localStorage.getItem("sendbirdUserId")) {
      const j = "Jacob";

      localStorage.setItem("sendbirdUserId", j);
      setUserId(j);
      itemValue = j;
    } else {
      setUserId(itemValue);
    }

    const fetchUser = async () => {
      const res = await (await fetch(`/api/users/${itemValue}`)).json();

      setAccessToken(res.data.access_token);
    };

    fetchUser().catch(console.error);
  }, []);

  return (
    <>
      {accessToken && userId && (
        <SendbirdProvider
          appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID as string}
          userId={userId as string}
          accessToken={accessToken}
          theme="dark"
        >
          {children}
        </SendbirdProvider>
      )}
    </>
  );
}