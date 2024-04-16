"use client";

import React, { useState } from "react";
import { ChannelListProvider } from "@sendbird/uikit-react/ChannelList/context";
import ChannelList from "@/app/components/ChannelList";
import { Channel, useSendbirdStateContext } from "@sendbird/uikit-react";
import { Profile } from "@/app/types";
import ProfileDrawer from "@/app/components/ProfileDrawer";

export default function Chats() {
  const store = useSendbirdStateContext();
  const [currentChannelUrl, setCurrentChannelUrl] = useState<string | null>(null);
  const [currentProfile, setCurrentProfile] = useState<Profile>();
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const handleHeaderActionClick = async () => {
    const isOpen = !isDrawerVisible;

    if (!isOpen) {
      setCurrentProfile(undefined);
      setDrawerVisible(false);

      return;
    }


    const channel = await store.stores.sdkStore.sdk.groupChannel.getChannel(currentChannelUrl);

    if (!channel?.members || channel?.members.length !== 2) {
      throw new Error("Channel inviter is null");
    }

    const myRoleId = store.stores.userStore.user.userId;

    const targetRoleId = channel.members.find((u: any) => u.userId !== myRoleId)?.userId;

    if (!targetRoleId) {
      throw new Error("target role ID is null");
    }

    try {
      const res = await fetch(`/api/role/${targetRoleId}`);
      const data = await res.json();

      setCurrentProfile(data?.data?.profile);
      setDrawerVisible(v => !v);
    } catch (e) {
      console.error(e);
    }
  };

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
      <div className={isDrawerVisible ? "basis-3/5" : "basis-4/5"}>
        {currentChannelUrl &&
          <Channel
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={handleHeaderActionClick}
          />
        }
      </div>
      {isDrawerVisible &&
        <div className="basis-1/5">
          <ProfileDrawer data={currentProfile} />
        </div>
      }
    </main>
  );
}
