"use client";

import { Channel } from "@sendbird/uikit-react";
import { useState } from "react";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { ChannelListProvider } from "@sendbird/uikit-react/ChannelList/context";
import ChannelList from "@/app/components/ChannelList";
import CurrentUser from "@/app/components/CurrentUser";

export default function Home() {
  const [currentChannel, setCurrentChannel] = useState<GroupChannel | null>(null);

  return (
    <main className="flex h-screen">
      <div className="border-e border-zinc-800 basis-1/5 flex flex-col justify-between">
        <ChannelListProvider>
          <ChannelList
            currentChannel={currentChannel}
            onChannelSelect={(c) => setCurrentChannel(c)}
          />
        </ChannelListProvider>
        <CurrentUser />
      </div>
      <div className="basis-4/5">
        {currentChannel?.url ?
          <Channel
            channelUrl={currentChannel.url}
          />
          : (
            <div className="flex justify-center text-center items-center h-screen">
              <h1 className="text-2xl text-gray-500">
                Choose one on the left
              </h1>
            </div>
          )}
      </div>
    </main>
  );
}
