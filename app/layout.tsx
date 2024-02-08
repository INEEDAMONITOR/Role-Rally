"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import { SendBirdProvider as Sendbird } from "@sendbird/uikit-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const testUserId = "Jacob";
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await (await fetch(`/api/user/fetchUser/${testUserId}`)).json();

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
          <Sendbird
            appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID as string}
            userId={testUserId}
            accessToken={accessToken}
            theme="dark"
          >
            {children}
          </Sendbird>
        )}
      </body>
    </html>
  );
}
