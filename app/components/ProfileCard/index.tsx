import { Profile } from "@/app/types";
import { Avatar, Button } from "flowbite-react";
import Link from "next/link";
import { Link as LinkIcon } from "@/app/components/Icon";

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
          className="flex-shrink-0"
          img={data.avatar}
          alt={`avatar of ${data.firstName}`}
          rounded
        >
          <div className="space-y-1">
            <div>
              {data.firstName}
              {data.pronouns &&
                <span className="text-sm text-gray-400">
                  {` (${data.pronouns})`}
                </span>
              }
            </div>
            <div className="text-sm font-normal text-gray-400">
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
      <div className="flex flex-col mt-6 space-y-1">
        {data.about && (
          <div className="font-normal text-gray-200">
            {`${data.about}`}
          </div>
        )}
        {data.website && (
          <Link
            className="font-normal"
            href={data.website}
            target="_blank"
          >
            <div className="flex space-x-1">
              <div className="self-center">
                <LinkIcon />
              </div>
              <div className="text-blue-500">
                {data.website}
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}