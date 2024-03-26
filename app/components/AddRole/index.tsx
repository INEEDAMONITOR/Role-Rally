import React from "react";
import Button from "@/app/components/Button";

export function AddRole() {
  return (
    <Button 
      display={{
        type: "ICON",
        size: "SMALL",
      }}
      icon={{
        src: "/AddIconImage.jpg",
        alt: "avatar"
      }}
    />
  );
}
