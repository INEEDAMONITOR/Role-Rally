"use client";

import { ProfileForm } from "@/app/components/Form";
import { useRouter } from "next/navigation";

export default function CreateRole() {
  const router = useRouter();
  
  const handleSubmitProfile = () => {
    router.replace("/chats");
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
        <ProfileForm onSubmit={handleSubmitProfile} />
      </div>
    </div>
  );
}