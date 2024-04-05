import { HTMLAttributes } from "react";

export const Back = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className="flex items-center w-12 h-full text-gray-500 hover:text-gray-400 cursor-pointer"
      {...props}
    >
      <svg
        className="w-8 h-8"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 12h14M5 12l4-4m-4 4 4 4"
        />
      </svg>
    </div>
  );
};

export const ArrowRight = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 12H5m14 0-4 4m4-4-4-4"
        />
      </svg>
    </div>
  );
};

export const Bars = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
          d="M5 7h14M5 12h14M5 17h14"
        />
      </svg>
    </div>

  );
};