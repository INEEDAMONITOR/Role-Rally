import Image from "next/image";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Display = {
  type?: "ICON";
  size?: "SMALL";
};

type IconImage = {
  src: string,
  alt: string,
}
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  display?: Display;
  icon?: IconImage;
  children?: ReactNode;
};

export default function Button(props: Props) {
  if (props.display?.type === "ICON" && props.icon) {
    let width, height;
  
    if (props.display.size === "SMALL") {
      width = 42;
      height = 42;
    } else {
      width = 50;
      height = 50;
    }

    return (
      <button
        className="flex p-2"
        {...props}
      >
        <Image
          className="rounded-full self-center"
          src={props.icon.src}
          alt={props.icon.alt}
          width={width}
          height={height}
        />
      </button>
    );
  } else {
    return (
      <button
        className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        {...props}
      >
        {props.children}
      </button>
    );
  }
}