"use strict";
import React from "react";
interface ButtonProps {
  handler: (...args: any[]) => any;
  children?: React.ReactNode;
  className?: string
}
export const Button = (props: ButtonProps) => {
  return (
    <div>
      <button
        onClick={props.handler}
        className={`${props.className} bg-green-600 hover:bg-green-700 bg-green 500 text-white font-bold py-2 px-2 rounded text-sm`}
      >
        {props?.children || "Button"}
      </button>
    </div >
  );
};