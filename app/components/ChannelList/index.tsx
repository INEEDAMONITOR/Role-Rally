import Image from "next/image";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { useChannelListContext } from "@sendbird/uikit-react/ChannelList/context";
import CreateChannel from "@sendbird/uikit-react/CreateChannel";
import { useState } from "react";
import { BaseMessage, UserMessage } from "@sendbird/chat/message";
import { useSendbirdStateContext } from "@sendbird/uikit-react";
import { Edit, Inbox } from "@/app/components/Icon";

interface Props {
  currentChannelUrl: string | null;
  // eslint-disable-next-line no-unused-vars
  onChannelSelect: (channel: GroupChannel) => void;
}

const ChannelListItem = (props:
  {
    selected: boolean;
    coverUrl: string;
    name: string;
    preview: BaseMessage | null;
    unreadMessageCount: number;
    onClick: () => void;
  }) => {
  return (
    <div
      className={`flex justify-between px-3 py-6 cursor-pointer ${props.selected ? "bg-purple-500" : "hover:bg-zinc-900"} rounded-2xl mx-2`}
      onClick={props.onClick}
    >
      <div className="flex space-x-6 items-center">
        <div>
          <Image
            className="rounded-full"
            src={props.coverUrl}
            alt={props.name}
            width={56}
            height={56}
          />
        </div>
        <div>
          <div className="font-semibold">
            {props.name}
          </div>
          <div className={`${props.selected ? "" : "text-gray-400"}`}>
            {props.preview ? (props.preview as UserMessage).message : null}
          </div>
        </div>
      </div>
      {props.unreadMessageCount > 0 && (
        <div className="flex-shrink-0 self-center">
          <div className="rounded-full bg-red-600 w-6 text-center">
            {props.unreadMessageCount > 100 ? "99+" : props.unreadMessageCount}
          </div>
        </div>
      )}
    </div>
  );
};

const ChannelList = ({ currentChannelUrl, onChannelSelect }: Props) => {
  const { initialized, allChannels } = useChannelListContext();
  const store = useSendbirdStateContext();
  const user = store?.stores?.userStore?.user;
  const [isCreateChannelVisible, setCreateChannelVisible] = useState(false);

  const handleChannelCreated = (c: GroupChannel) => {
    onChannelSelect(c);
    setCreateChannelVisible(false);
  };

  const handleCancelCreate = () => {
    setCreateChannelVisible(false);
  };

  const handleNewClick = () => {
    setCreateChannelVisible(true);
  };

  if (!initialized) {
    return null;
  }

  return (
    <div className="bg-black h-full">
      <div className="flex justify-between py-7 px-4 fixed bg-black w-80">
        <div className="text-3xl font-semibold">
          Chats
        </div>
        {isCreateChannelVisible && (
          <CreateChannel
            onChannelCreated={handleChannelCreated}
            onCancel={handleCancelCreate}
          />
        )}
        <div
          className="flex items-center cursor-pointer"
          onClick={handleNewClick}
        >
          <Edit className="text-gray-200 w-8 h-8" />
        </div>
      </div>
      <div className="w-2 h-24" />
      {allChannels.length > 0 ?
        <div className="overflow-y-auto h-screen pb-28">
          {allChannels.map(c => {
            const selected = c.url === currentChannelUrl;
            let coverUrl = c.coverUrl;
            let name = c.name;

            if (c.memberCount === 2) {
              const partner = c.members.find(m => m.userId !== user?.userId) ?? null;
              if (partner) {
                coverUrl = partner.profileUrl;
                name = partner.nickname;
              }
            }


            return (
              <ChannelListItem
                key={c.url}
                selected={selected}
                coverUrl={coverUrl}
                name={name}
                preview={c.lastMessage}
                unreadMessageCount={c.unreadMessageCount}
                onClick={() => onChannelSelect(c)}
              />
            );
          })}
        </div> :
        <div className="flex flex-col items-center space-y-2 h-80 pt-48 text-gray-400">
          <Inbox className="w-20 h-20" />
          <div>
            No Chats
          </div>
        </div>
      }
    </div>
  );
};

export default ChannelList;