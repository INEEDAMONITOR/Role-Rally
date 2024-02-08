import Image from "next/image";
import { OpenChannel } from "@sendbird/chat/openChannel";

interface Props {
  channels: OpenChannel[];
  currentChannel: OpenChannel | null;
  // eslint-disable-next-line no-unused-vars
  onClickChannel: (channel: OpenChannel) => void;
}

const ChannelList = ({ channels, currentChannel, onClickChannel }: Props) => {
  return (
    <>
      {
        channels.map(c => (
          <div
            key={c.url}
            className={`flex space-x-6 px-3 py-6 cursor-pointer ${c.url === currentChannel?.url ? "bg-purple-500" : "hover:bg-gray-700"} rounded-2xl mx-2`}
            onClick={() => onClickChannel(c)}
          >
            <div className="self-center">
              <Image
                className="rounded-full"
                src={c.coverUrl}
                alt={c.name}
                width={56}
                height={56}
              />
            </div>
            <div>
              <div className="font-semibold">
                {c.name}
              </div>
              <div className={`${c.url === currentChannel?.url ? "" : "text-gray-400"}`}>
                A cool channel.
              </div>
            </div>
          </div>
        ))
      }
    </>
  );
};

export default ChannelList;