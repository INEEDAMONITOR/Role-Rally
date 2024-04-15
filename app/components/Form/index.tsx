"use client";

import { UserContext } from "@/app/contexts/UserContext";
import { Button } from "flowbite-react";
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowRight } from "../Icon";
import ImageUploader from "../ImageUploader";
import { Profile } from "@/app/types";

type ProfileFormProps = {
  // if defaultValues prop is passed, then it's an editing action
  defaultValues?: Profile;
  onSubmit?: () => void;
}

type ProfileFormInputs = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export const ProfileForm = (props: ProfileFormProps) => {
  const { user } = useContext(UserContext);
  const [imgUrl, setImgUrl] = useState<string>();
  const [isSubmitLoading, setSubmitLoading] = useState(false);
  const {
    register,
    handleSubmit,
  } = useForm<ProfileFormInputs>({
    values: props.defaultValues,
  });
  
  const handleImgUploadComplete = (url: string) => {
    setImgUrl(url);
  };
    
  const onSubmit: SubmitHandler<ProfileFormInputs> = async (data) => {
    if (!user?._id) {
      throw new Error("User Id does not exists");
    }
  
    setSubmitLoading(true);
  
    try {
      if (props.defaultValues) {
        await fetch(`/api/profile/${props.defaultValues.ownerRoleId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            avatar: imgUrl ?? "",
          })
        });
        toast.success("Profile updated successfully!");
      } else {
        await fetch(`/api/role/create/${user._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            avatar: imgUrl ?? "",
          })
        });
        toast.success("Role created successfully!");
      }
    } finally {
      setSubmitLoading(false);
      props.onSubmit?.();
    }
  };

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-between space-x-4">
        <div className="flex-grow space-y-5">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-200">
              First Name
            </label>
            <input
              {...register("firstName", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
              className="mt-2 block w-full rounded-md border-0 py-1.5 ps-2 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-200">
              Last Name
            </label>
            <input
              {...register("lastName", {
                pattern: /^[A-Za-z]+$/i,
              })}
              className="mt-2 block w-full rounded-md border-0 py-1.5 ps-2 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
            />
          </div>
        </div>
        <ImageUploader
          defaultValue={props?.defaultValues?.avatar}
          onClientUploadComplete={handleImgUploadComplete}
        />
      </div>

      <div className="text-gray-200">
        <label className="block text-sm font-medium leading-6">
          Username
        </label>
        {props.defaultValues ?
          <div className="text-gray-300 text-sm pt-1.5">
            {`@${props.defaultValues.username}`}
          </div> :
          <input
            {...register("username", {
              required: true,
            })}
            className="mt-2 block w-full rounded-md border-0 py-1.5 ps-2 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
          />}
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-200">
          Email
        </label>
        <input
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          className="mt-2 block w-full rounded-md border-0 py-1.5 ps-2 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          color="purple"
          size="sm"
          disabled={isSubmitLoading}
        >
          <div className="flex items-center">
            Continue
            <ArrowRight />
          </div>
        </Button>
      </div>
    </form>
  );
};