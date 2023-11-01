import React from "react";

export default function test() {
  return (
    <div>
      <div className="border-2 relative w-64 h-32 bg-gray-300">
        <div className="border-2 absolute top-0 right-0 w-0 h-0 border-solid border-l-16 border-r-8 border-t-16 border-l-yellow-500  border-t-transparent bg-yellow-500">
          <div className="border-2 absolute top-0 left-0 text-black transform -rotate-45 -translate-x-4 translate-y-1">
            Expired
          </div>
        </div>
        <div className="p-4"></div>
      </div>
    </div>
  );
}
