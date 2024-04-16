import { Avatar } from "flowbite-react";
import { Profile } from "@/app/types";
import { Link as LinkIcon } from "@/app/components/Icon";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  data?: Profile;
}

const LabelText = (props: {
  label: string;
  children?: ReactNode;
}) => (
  <div className="mb-4">
    <label className="block text-gray-200 font-medium leading-6">
      {props.label}
    </label>
    <div className="text-gray-300 text-sm pt-1.5">
      {props.children}
    </div>
  </div>
);

export default function ProfileDrawer(props: Props) {
  const { data } = props;

  if (!data) {
    return (
      <div className="flex justify-center items-center h-full p-4 text-gray-400">
        <div>
          Profile is empty.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 pt-10">
      <div className="self-center mb-3">
        <Avatar
          img={data.avatar}
          rounded
          size={"lg"}
        />
      </div>
      <div className="self-center text-gray-200 mb-1">
        {`${data.firstName} ${data.lastName}`}
      </div>
      {data.pronouns &&
        <div className="self-center text-sm text-gray-400 mb-1">
          {`(${data.pronouns})`}
        </div>
      }
      <div className="self-center text-sm text-gray-400 mb-1">
        {`@${data.username}`}
      </div>
      <div className="mt-10">
        <LabelText label="Bio">
          {data.about ? `${data.about}` : "-"}
        </LabelText>
        <LabelText label="Email">
          {`${data.email}`}
        </LabelText>
        {data.website &&
          <LabelText label="Website">
            <div className="text-blue-500 text-sm pt-1.5">
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
            </div>
          </LabelText>
        }
      </div>
    </div>
  );
}