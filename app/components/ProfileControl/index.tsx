import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Back } from "@/app/components/Icon";
import { Profile, Role } from "@/app/types";
import { SubmitHandler, useForm } from "react-hook-form";
import Dialog from "@/app/components/Dialog";
import ProfileCard from "@/app/components/ProfileCard";
import { Badge, Button } from "flowbite-react";
import Divider from "@/app/components/Divider";
import ProfileDrawer from "@/app/components/ProfileDrawer";

type ProfileControlProps = {
  isVisible: boolean;
  onClose: () => void;
  roles: Role[];
}

type ProfileControlForm = {
  [k:string]: boolean;
}

export default function ProfileControl(props: ProfileControlProps) {
  const HEADERS: ReactNode[] = [
    "Choose a Profile",
    <div
      key="Change Visibility"
      className="flex items-center space-x-2"
    >
      <Back
        className="text-gray-400 cursor-pointer"
        onClick={() => setStep(0)}
      />
      <div>
        Change Visibility
      </div>
    </div>,
  ];
  const FIELDS = [
    {
      label: "Last Name",
      name: "lastName",
    },
    {
      label: "Email",
      name: "email",
    },
    {
      label: "Bio",
      name: "about",
    },
    {
      label: "Pronouns",
      name: "pronouns",
    },
    {
      label: "Website",
      name: "website",
    },
  ];
  const { roles, isVisible, onClose } = props;
  const [step, setStep] = useState<number>(0);
  const [currentProfile, setCurrentProfile] = useState<Profile>();
  const [defaultVisibilities, setDefaultVisibilities] = useState<ProfileControlForm>();
  const {
    register,
    handleSubmit,
    watch,
  } = useForm<ProfileControlForm>({
    values: defaultVisibilities,
  });
  const watchAllFields = watch();
  const previewProfile = useMemo(() => {
    if (!currentProfile) {
      return;
    }
    const newPreviewPairs = Object.keys(watchAllFields).reduce((result: any, key) => {
      if (watchAllFields[key] && FIELDS.find(i => i.name === key)) {

        // @ts-ignore
        return [...result, [key, currentProfile[key]]];
      }

      return result;
    }, []);

    const newPreviewObj = Object.fromEntries(newPreviewPairs);

    const requiredPairs = Object.keys(currentProfile).reduce((result: any, key) => {
      if (newPreviewObj[key] === undefined &&
        !FIELDS.find(i => i.name === key)
      ) {

        // @ts-ignore
        return [...result, [key, currentProfile[key]]];
      }

      return result;
    }, []);

    return Object.fromEntries([...requiredPairs, ...newPreviewPairs]);
  }, [watchAllFields]);

  const handleProfileClick = async (e: React.MouseEvent<HTMLDivElement>, profile: Profile) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await fetch(`/api/profile/visibility/${profile._id}`);
    const data = await res.json();
    const profileSelector = data.data;
    
    setDefaultVisibilities({
      lastName: true,
      email: true,
      about: true,
      pronouns: true,
      website: true,
      ...profileSelector,
    });

    const profileRes = await fetch(`/api/role/${profile.ownerRoleId}`);
    const profileData = await profileRes.json();
    const completeProfile = profileData?.data?.profile;
    
    setCurrentProfile(completeProfile);
    setStep(1);
  };

  const handleDialogClose = () => {
    setStep(0);
    setCurrentProfile(undefined);
    onClose();
  };

  const onSubmit: SubmitHandler<ProfileControlForm> = async (data) => {
    await fetch(`/api/profile/visibility/${currentProfile?._id}`, {
      method: "PUT",
      body: JSON.stringify({
        lastName: data.lastName ? "1" : "0",
        email: data.email ? "1" : "0",
        about: data.about ? "1" : "0",
        pronouns: data.pronouns ? "1" : "0",
        website: data.website ? "1" : "0",
      }),
    });

    location.href = "/chats";
  };

  return (
    <Dialog
      className={step === 1 ? "max-w-2xl" : "max-w-xl"}
      header={HEADERS[step]}
      isVisible={isVisible}
      onClickClose={handleDialogClose}
    >
      <div>
        {step === 0 &&
          <div className="flex flex-col space-y-4">
            {roles.map(r => (
              <div
                key={r._id}
                className="cursor-pointer hover:bg-zinc-900 p-4 border border-zinc-600 rounded-xl"
                onClick={(e) => handleProfileClick(e, r.profile)}
              >
                <ProfileCard data={r.profile} />
              </div>
            )
            )}
          </div>
        }

        {step === 1 && previewProfile &&
          <div className="flex flex-col">
            <div className="flex justify-between space-x-24">
              <form onSubmit={handleSubmit(onSubmit)}>
                {FIELDS.map(f => (
                  <div
                    key={f.name}
                    className="flex space-x-2 items-center mb-2"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                      {...register(f.name)}
                    />
                    <label className="block text-sm font-medium leading-6">
                      {f.label}
                    </label>
                  </div>
                ))}
                <Button
                  className="mt-4"
                  type="submit"
                  size="sm"
                  color="purple"
                >
                  Save
                </Button>
              </form>

              <div className="border border-zinc-600 rounded-xl p-4 flex-grow">
                <Badge
                  color="gray"
                  className="absolute right-10 top-20"
                >
                  Preview
                </Badge>
                <ProfileCard data={previewProfile as Profile} />
                <Divider />
                <ProfileDrawer data={previewProfile as Profile} />
              </div>
            </div>
          </div>
        }
      </div>
    </Dialog>
  );
}