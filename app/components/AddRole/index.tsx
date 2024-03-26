"use client";

import Button from "@/app/components/Button";
import Dialog from "@/app/components/Dialog";
import { useState } from "react";

export function AddRole() {
  const [isDialogVisible, setDialogVisible] = useState(false);

  const handleOpenDialog = () => {
    setDialogVisible(true);
  };

  const handleCreateRole = async (formData: FormData) => {
    console.log(formData);
  };

  return (
    <>
      <Button
        display={{
          type: "ICON",
          size: "SMALL",
        }}
        icon={{
          src: "/AddIconImage.jpg",
          alt: "avatar"
        }}
        onClick={handleOpenDialog}
      />
      <Dialog
        header={
          "Create Role"
        }
        isVisible={isDialogVisible}
        onClickClose={setDialogVisible}
      >
        <form
          className="space-y-5"
          action={handleCreateRole}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-200"
            >
              name
            </label>
            <input
              name="name"
              required
              className="mt-2 block w-full rounded-md border-0 py-1.5 ps-2 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
            />
          </div>

          <div>
            <label
              htmlFor="remark"
              className="block text-sm font-medium leading-6 text-gray-200"
            >
              remark (optional)
            </label>
            <input
              name="remark"
              className="mt-2 block w-full rounded-md border-0 py-1.5 ps-2 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
