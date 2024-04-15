"use client";

import { UserContext } from "@/app/contexts/UserContext";
import { Button } from "flowbite-react";
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowRight } from "../Icon";
import ImageUploader from "../ImageUploader";
import { Profile } from "@/app/types";
import Dialog from "@/app/components/Dialog";
import ProfileCard from "@/app/components/ProfileCard";

type ProfileFormProps = {
  // if defaultValues prop is passed, then it's an editing action
  defaultValues?: Profile;
  onClose?: () => void;
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
  const [isDeleting, setDeleting] = useState(false);
  const [isDeleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const {
    register,
    handleSubmit,
  } = useForm<ProfileFormInputs>({
    values: props.defaultValues,
  });
  
  const handleImgUploadComplete = (url: string) => {
    setImgUrl(url);
  };

  const handleDeleteRoleConfirm = () => {
    setDeleteConfirmVisible(true);
  };

  const handleCloseRoleDeleteConfirm = () => {
    setDeleteConfirmVisible(false);
  };

  const handleDeleteRole = async () => {
    if (!props.defaultValues?.ownerRoleId) {
      throw new Error("ownerRoleId cannot be undefined");
    }

    try {
      setDeleting(true);
      
      const res = await fetch(`/api/role/${props.defaultValues.ownerRoleId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({})
      });

      const data = await res.json();

      if (data.result) {
        toast.success(data.message);
        props.onClose?.();
      } else {
        toast.error(data.message);
      }
    } finally {
      setDeleting(false);
    }
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
      props.onClose?.();
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

      <div className={`flex ${props.defaultValues ? "justify-between" : "justify-end"}`}>
        {props.defaultValues && 
          <div className="self-center">
            <div
              className="text-red-600 hover:underline cursor-pointer text-sm"
              onClick={handleDeleteRoleConfirm}
            >
              Delete this role
            </div>
            <Dialog
              header="Confirm Deletion"
              dismissible
              isVisible={isDeleteConfirmVisible}
              onClickClose={handleCloseRoleDeleteConfirm}
            >
              <div className="text-gray-200 space-y-2">
                <p>
                  You are about to delete this role:
                  <div className="bg-zinc-900 border border-zinc-600 rounded-xl p-4 my-4 text-white">
                    <ProfileCard data={props.defaultValues} />
                  </div>
                </p>
                <p>
                  Once you delete your role, there is no going back. Please be certain.
                </p>
                <div className="pt-4 flex justify-end space-x-4">
                  <div
                    className="text-sm self-center cursor-pointer hover:underline"
                    onClick={handleCloseRoleDeleteConfirm}
                  >
                    Cancel
                  </div>
                  <Button
                    color="failure"
                    disabled={isDeleting}
                    onClick={handleDeleteRole}
                  >
                    I understand
                  </Button>
                </div>
              </div>
            </Dialog>
          </div>
        }
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