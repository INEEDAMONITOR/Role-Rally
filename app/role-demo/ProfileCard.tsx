"user strict";
import React, { useEffect } from "react";
import { Button } from "@/app/role-demo/Button";
import { Profile } from "@/app/types";
import Image from "next/image";
import { useState } from "react";
import { updateProfile } from "@/app/utils/https";

interface Props {
  profile: Profile;
}

const getBase64 = (file: File) => {
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL: any = "";
    // Make new FileReader
    let reader = new FileReader();
    // Convert the file to base64 text
    reader.readAsDataURL(file);
    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

export const ProfileCard = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>(props.profile);
  const [newProfile, setNewProfile] = useState<Profile | {}>({});
  useEffect(() => {
    setProfile(props.profile);
  }, [props]);
  const editHandler = async () => {
    setIsEditing(!isEditing);
  };
  const saveHandler = async () => {
    updateProfile({
      ...newProfile,
      id: profile._id,
    }).then((res) => {
      setProfile(res.profile);
    });
    setNewProfile({});
    setIsEditing(!isEditing);
    // location.reload();
  };

  const changeAvatarHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file)
      getBase64(file).then((base64: any) => {
        setNewProfile((prev) => {
          return {
            ...prev,
            avatar: base64,
          };
        });
      });
  };
  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProfile((prev) => {
      return {
        ...prev,
        displayName: e.target.value,
      };
    });
  };
  const changeAboutHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProfile((prev) => {
      return {
        ...prev,
        about: e.target.value,
      };
    });
  };
  const changePronounsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProfile((prev) => {
      return {
        ...prev,
        pronouns: e.target.value,
      };
    });
  };

  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg bg-gray-400 text-black">
      <div className="px-6 py-4">
        <p>{profile._id}</p>
        <div className="flex items-center space-x-2">
          {!isEditing && (
            <Image
              src={profile.avatar ? profile.avatar : "/default.jpg"}
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          {isEditing && (
            <>
              <span className="flex-none">Avatar: </span>
              <input
                type="file"
                name="file"
                className="file:border-none file:rounded file:text-sm file:font-semibold"
                onChange={changeAvatarHandler}
              />
            </>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="flex-none">Name: </span>
          {!isEditing && profile.displayName}
          {isEditing && (
            <input
              type="text"
              placeholder={profile.displayName}
              onChange={changeNameHandler}
              defaultValue={profile.displayName}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className="flex-none">About: </span>
          {!isEditing && profile.about}
          {isEditing && (
            <input
              type="text"
              placeholder={profile.about}
              defaultValue={profile.about}
              onChange={changeAboutHandler}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="flex-none">Pronouns: </span>
          {!isEditing && profile.pronouns}
          {isEditing && (
            <input
              type="text"
              placeholder={profile.pronouns}
              defaultValue={profile.pronouns}
              onChange={changePronounsHandler}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          )}
        </div>
        <Button
          handler={editHandler}
          className="hover:bg-green-700 bg-green 500"
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
        {isEditing && <Button handler={saveHandler}>Save</Button>}
      </div>
    </div>
  );
};
