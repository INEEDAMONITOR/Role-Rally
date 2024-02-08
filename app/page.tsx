"use client";

import { useSendbirdStateContext } from "@sendbird/uikit-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { OpenChannel as OpenChannelType } from "@sendbird/chat/openChannel";
import { OpenChannelProvider } from "@sendbird/uikit-react/OpenChannel/context";
import ChannelList from "@/app/components/ChannelList";

export default function Home() {
  const store = useSendbirdStateContext();
  const sdk = store?.stores?.sdkStore?.sdk;
  const user = store?.stores?.userStore?.user;
  const [channels, setChannels] = useState<OpenChannelType[]>([]);
  const [currentChannel, setCurrentChannel] = useState<OpenChannelType | null>(null);

  useEffect(() => {
    if (!sdk || !sdk.openChannel) {
      return;
    }
    const openChannelListQuery = sdk.openChannel.createOpenChannelListQuery();
    openChannelListQuery.next().then((openChannels: OpenChannelType[]) => {
      setChannels(openChannels);
    });
  }, [sdk, setCurrentChannel]);

  return (
    <main className="flex h-screen">
      <div className="border-e border-zinc-800 basis-1/4 flex flex-col justify-between">
        <div className="py-6">
          <h1 className="text-4xl font-bold pb-3 ps-3">
            Chats
          </h1>
          <ChannelList
            channels={channels}
            currentChannel={currentChannel}
            onClickChannel={(c) => setCurrentChannel(c)}
          />
        </div>
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
      <div className="basis-3/4 flex flex-col">
        {currentChannel ? (
          <OpenChannelProvider channelUrl={currentChannel.url}>

          </OpenChannelProvider>
        ) : null}
      </div>
    </main>
  );
}
