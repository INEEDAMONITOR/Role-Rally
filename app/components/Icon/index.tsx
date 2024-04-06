import { HTMLAttributes, ReactNode } from "react";

const IconWrapper = (props: {children: ReactNode, htmlProps: HTMLAttributes<HTMLDivElement>}) => {
  return (
    <div
      className="flex items-center w-12 h-full text-gray-500 hover:text-gray-400 cursor-pointer"
      {...props.htmlProps}
    >
      {props.children}
    </div>
  );
};

export const Back = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <IconWrapper htmlProps={props} >
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
    </IconWrapper>
  );
};

export const ArrowRight = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <IconWrapper htmlProps={props} >
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
    </IconWrapper>
  );
};

export const Bars = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <IconWrapper htmlProps={props} >
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
    </IconWrapper>
  );
};

export const Inbox = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <IconWrapper htmlProps={props}>
      <svg
        className="w-24 h-24 text-gray-400"
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
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9"
        />
      </svg>
    </IconWrapper>
  );
};