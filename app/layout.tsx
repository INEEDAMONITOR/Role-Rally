"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import "@sendbird/uikit-react/dist/index.css";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const [accessToken, setAccessToken] = useState();
  const userId = localStorage.getItem("sendbirdUserId");

  if (userId == null) {
    localStorage.setItem("sendbirdUserId", "Jacob");
  }

  useEffect(() => {
    const fetchUser = async () => {
      const res = await (await fetch(`/api/user/fetchUser/${userId}`)).json();

      setAccessToken(res.data.access_token);
    };

    fetchUser().catch(console.error);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Role Rally."
        />
        <title>
          Role Rally
        </title>
      </head>
      <body className={inter.className}>
        {accessToken && (
          <SendbirdProvider
            appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID as string}
            userId={userId as string}
            accessToken={accessToken}
            theme="dark"
          >
            {children}
          </SendbirdProvider>
        )}
      </body>
    </html>
  );
}
