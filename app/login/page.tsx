"use client";

import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { logout } from "@/app/utils/logout";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitLoading, setSubmitLoading] = useState(false);

  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setSubmitLoading(true);
      if (!email || !password || typeof email !== "string" || typeof password !== "string") {
        return;
      }

      const res = await (await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        })
      })).json();

      if (res?.token) {
        Cookies.set("roleRallyUserToken", res.token);
        router.replace("/chats");
      } else {
        toast.error(res.message);
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCreateAccount = () => {
    router.replace("/signup");
  };

  useEffect(() => {
    const isLogOut = !!searchParams.get("out");

    if (isLogOut) {
      logout();
    }
  }, []);

  return (
    <div className="flex min-h-full flex-col justify-center p-12">
      <div>
        <Image
          className="rounded-full"
          width={64}
          height={64}
          src="/logo.png"
          alt="Role Rally"
        />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-24 text-center text-4xl font-bold leading-9 tracking-tight text-gray-200">
          Log in
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action={handleLogin}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-200"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-200"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
              />
            </div>
          </div>

          <Button
            type="submit"
            color="purple"
            isProcessing={isSubmitLoading}
            className="flex w-full justify-center rounded-md"
          >
            Sign
            in
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Not a member?
          <a
            href="/signup"
            className="font-semibold leading-6 text-purple-500 hover:text-purple-600 ms-2"
            onClick={handleCreateAccount}
          >
            Join as a member
          </a>
        </p>
      </div>
    </div>
  );
}
