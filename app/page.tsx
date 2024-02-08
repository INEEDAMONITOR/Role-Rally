"use client";

import { Channel, useSendbirdStateContext } from "@sendbird/uikit-react";
import Image from "next/image";
import { useState } from "react";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { ChannelListProvider } from "@sendbird/uikit-react/ChannelList/context";
import ChannelList from "@/app/components/ChannelList";

export default function Home() {
  const store = useSendbirdStateContext();
  const user = store?.stores?.userStore?.user;
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
        <div className="flex space-x-6 p-6">
          <div className="self-center">
            <Image
              className="rounded-full"
              src={user?.profileUrl}
              alt="avatar"
              width={48}
              height={48}
            />
          </div>
          <div>
            <div className="text-gray-300">
              {user?.nickname}
            </div>
            <div className="text-gray-500">
              {user?.userId}
            </div>
          </div>
        </div>
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
