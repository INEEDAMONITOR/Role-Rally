"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import ImageUploader from "@/app/components/ImageUploader";
import { useContext, useState } from "react";
import { ArrowRight } from "@/app/components/Icon";
import { UserContext } from "@/app/contexts/UserContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "flowbite-react";

type Inputs = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export default function CreateRole() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [isSubmitLoading, setSubmitLoading] = useState(false);
  const {
    register,
    handleSubmit,
  } = useForm<Inputs>();

  const handleImgUploadComplete = (url: string) => {
    setImgUrl(url);
  };
  
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!user?._id) {
      throw new Error("User Id does not exists");
    }

    setSubmitLoading(true);

    try {
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
    } finally {
      setSubmitLoading(false);
    }
    
    router.replace("/chats");
    toast.success("Role created successfully!");
  };

  return (
    <div className="flex flex-col p-6 space-y-12 mx-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">
          {"Let's create your new identity. 🧢 🎩 👒 🎓 👑"}
        </h1>
        <h2 className="text-gray-400">
          To create a new Role, fill out the form.
        </h2>
      </div>
      <div className="border border-zinc-700 rounded-2xl p-8 max-w-xl">
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
            <ImageUploader onClientUploadComplete={handleImgUploadComplete} />
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-200">
              Username
            </label>
            <input
              {...register("username", {
                required: true,
              })}
              className="mt-2 block w-full rounded-md border-0 py-1.5 ps-2 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
            />
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
      </div>
    </div>
  );
}