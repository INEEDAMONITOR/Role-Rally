"use client";

import React, { useState } from "react";
import { ChannelListProvider } from "@sendbird/uikit-react/ChannelList/context";
import ChannelList from "@/app/components/ChannelList";
import { Channel } from "@sendbird/uikit-react";

export default function Chats() {
  const [currentChannelUrl, setCurrentChannelUrl] = useState<string | null>(null);

  return (
    <main className="flex h-screen">
      <div className="border-e border-zinc-800 basis-1/5 flex flex-col justify-between">
        <ChannelListProvider>
          <ChannelList
            currentChannelUrl={currentChannelUrl}
            onChannelSelect={(c) => setCurrentChannelUrl(c.url)}
          />
        </ChannelListProvider>
      </div>
      <div className="basis-4/5">
        {currentChannelUrl && <Channel channelUrl={currentChannelUrl} />}
      </div>
    </main>
  );
}
