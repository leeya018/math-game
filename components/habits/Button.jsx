import React from "react";

export default function Button({
  children = "",
  onClick,
  width = "",
  position = "",
  size = "w-[128px] h-[43px]",
  color = "bg-blue",
  ref = null,
}) {
  return (
    <button
      className={`p-2 text-white flex items-center
       justify-center rounded-md   ${color} ${width} ${position} ${size}`}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </button>
  );
}
