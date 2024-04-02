import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

export default function NavBar(props: Props) {
  return (
    <div className="h-16 px-4 border-b border-zinc-800 flex">
      {props.children}
    </div>
  );
}