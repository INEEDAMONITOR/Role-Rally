import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import "@sendbird/uikit-react/dist/index.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
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
        {children}
      </body>
    </html>
  );
}
