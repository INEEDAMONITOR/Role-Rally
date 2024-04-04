import Image from "next/image";
import { ButtonHTMLAttributes, ReactNode } from "react";

type IconButton = {
  type?: "CIRCLE" | "ROUND_BUTTON";
  lg?: boolean;
  img?: IconImage;
  hoverable?: boolean;
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
    const { type = "CIRCLE", lg = false, img, hoverable = true } = icon;
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
        className={`flex p-2 rounded-2xl ${
          selected ? "bg-purple-500" :
            hoverable ? "hover:bg-zinc-700" : ""}
          ${props.className}`}
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
        className={`rounded-md px-4 py-3 leading-6 text-sm bg-indigo-700 hover:bg-indigo-600 shadow-sm ${props.className}`}
      >
        {children}
      </button>
    );
  }
}