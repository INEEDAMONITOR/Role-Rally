import { Profile } from "@/app/types";
import { Avatar } from "flowbite-react";
import Button from "@/app/components/Button";

interface Props {
  data: Profile;
}

export default function ProfileCard(props: Props) {
  const { data } = props;

  const handleViewProfile = (profile: Profile) => {
    console.log("Profile: ", profile);
  };

  return (
    <>
      <div className="flex w-72 justify-between">
        <Avatar
          img={data.avatar}
          alt={`avatar of ${data.displayName}`}
          rounded
        >
          <div className="space-y-1">
            <div>
              {data.displayName}
            </div>
            <div className="text-gray-300">
              {`@${data.username}`}
            </div>
          </div>
        </Avatar>
        <div className="self-center">
          <Button onClick={() => handleViewProfile(data)}>
            View
          </Button>
        </div>
      </div>
      <div className="mt-6">
        <div className="italic text-gray-300 font-thin">
          {`"${data.about}"`}
        </div>
      </div>
    </>
  );
}