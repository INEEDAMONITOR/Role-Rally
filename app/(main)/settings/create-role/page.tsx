import Button from "@/app/components/Button";

export default function CreateRole() {
  return (
    <div className="flex flex-col p-6 space-y-12 mx-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">
          {"Let's create your new identity. 🧢 🎩 👒 🎓 👑"}
        </h1>
        <h2 className="text-gray-400">
          To create a new Role, fill out the form or get started with one of your roles.
        </h2>
      </div>
      <div className="border border-zinc-700 rounded-2xl p-8 max-w-2xl">
        <form className="space-y-8">
          <div className="flex justify-between space-x-8">
            <div className="flex-grow space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-200"
                >
                  Role name
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
                  Remark (optional)
                </label>
                <input
                  name="remark"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 ps-2 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
                />
              </div>
            </div>

            <div className="border border-dashed border-zinc-500 hover:border-zinc-300 rounded-2xl w-40 shrink-0 cursor-pointer">
              <div className="text-center flex flex-col justify-center h-full">
                <svg
                  className="mx-auto h-12 w-12 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-xs font-bold leading-5 text-gray-100">
                  Upload a picture
                </p>
                <p className="text-xs leading-5 text-gray-300">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-2 block w-full rounded-md border-0 py-1.5 ps-2 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}