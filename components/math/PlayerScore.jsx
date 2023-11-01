import React, { useState } from "react";
import { observer } from "mobx-react-lite";

const PlayerScore = observer(({ name, score = 0 }) => {
  const getSquares = () => {
    return (
      <ul className="flex justify-center">
        {new Array(score).fill(1).map((_, key) => (
          <li
            key={key}
            className="w-6 h-6 bg-white border-blue_dark border-2"
          ></li>
        ))}
      </ul>
    );
  };
  return (
    <div className="flex justify-center">
      <div>
        {name} :({score})
      </div>{" "}
      {getSquares(score)}
    </div>
  );
});

export default PlayerScore;
