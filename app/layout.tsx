"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import "@sendbird/uikit-react/dist/index.css";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
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
        <div>
          <Toaster />
        </div>
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
      </body>
    </html>
  );
}
