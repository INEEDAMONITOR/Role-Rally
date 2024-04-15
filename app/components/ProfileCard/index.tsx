import { Profile } from "@/app/types";
import { Avatar, Button } from "flowbite-react";

interface Props {
  data: Profile;
  onClickEdit?: (profile: Profile) => void;
}

export default function ProfileCard(props: Props) {
  const { data, onClickEdit } = props;

  const handleEditProfile = async (profile: Profile) => {
    onClickEdit?.(profile);
  };

  return (
    <div className="my-4">
      <div className="flex w-72 justify-between">
        <Avatar
          img={data.avatar}
          alt={`avatar of ${data.firstName}`}
          rounded
        >
          <div className="space-y-1">
            <div>
              {data.firstName}
            </div>
            <div className="text-zinc-400 text-sm">
              {`@${data.username}`}
            </div>
          </div>
        </Avatar>
        {onClickEdit && (
          <div className="self-center">
            <Button
              size="sm"
              color="purple"
              onClick={() => handleEditProfile(data)}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
      {data.about && (
        <div className="mt-6">
          <div className="italic text-zinc-400">
            {`"${data.about}"`}
          </div>
        </div>
      )}
    </div>
  );
}