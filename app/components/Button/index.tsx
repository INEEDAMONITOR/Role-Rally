import Image from "next/image";
import { ButtonHTMLAttributes, ReactNode } from "react";

type IconButton = {
  type?: "CIRCLE" | "ROUND_BUTTON";
  lg?: boolean;
  img?: IconImage;
};

type IconImage = {
  src: string,
  alt: string,
}
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: IconButton;
  selected?: boolean;
  children?: ReactNode;
};

export default function Button(props: Props) {
  const { icon, selected, children } = props;

  if (icon) {
    const { type = "CIRCLE", lg = true, img } = icon;
    let width, height;

    if (lg) {
      width = 50;
      height = 50;
    } else {
      width = 42;
      height = 42;
    }

    return (
      <button
        {...props}
        className={`flex p-2 rounded-2xl ${selected ? "bg-purple-500" : "hover:bg-zinc-700"} ${props.className}`}
      >
        {img ?
          <Image
            className={`${type === "CIRCLE" ? "rounded-full" : "rounded"} self-center`}
            src={img.src}
            alt={img.alt}
            width={width}
            height={height}
          /> :
          children
        }
      </button>
    );
  } else {
    return (
      <button
        {...props}
        className={`rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${props.className}`}
      >
        {children}
      </button>
    );
  }
}