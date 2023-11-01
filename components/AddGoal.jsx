import React, { useEffect } from "react";
import Button from "components/habits/Button";
import Input from "components/habits/Input";
import { useRef } from "react";

export const AddGoal = ({ goalObj, updateGoal, handleAdd }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);
  return (
    <div
      className="flex flex-col justify-between  shadow-lg items-center bg-gray w-[350px]
      h-[250px] py-2"
    >
      <h1
        className="font-medium text-[18px]  w-[177px] 
        h-[30px] relative  text-center"
      >
        Add Goal:{" "}
      </h1>

      <Input
        inputRef={inputRef}
        size={"w-[177px] h-[30px]"}
        name="name"
        value={goalObj.name}
        onChange={(e) => updateGoal(e.target)}
      />
      <Input
        size={"w-[177px] h-[30px]"}
        name="description"
        value={goalObj.description}
        onChange={(e) => updateGoal(e.target)}
      />
      <Input
        type="date"
        size={"w-[177px] h-[30px]"}
        name="dateToAccomplish"
        value={goalObj.dateToAccomplish}
        onChange={(e) => updateGoal(e.target)}
      />
      <Input
        type="string"
        size={"w-[177px] h-[30px]"}
        name="prize"
        value={goalObj.prize}
        onChange={(e) => updateGoal(e.target)}
      />
      <Input
        type="string"
        size={"w-[177px] h-[30px]"}
        name="punishment"
        value={goalObj.punishment}
        onChange={(e) => updateGoal(e.target)}
      />

      <Button
        // position="relative bottom-[22px]"
        size={"w-[128px] h-[43px]"}
        color="bg-blue"
        onClick={handleAdd}
      >
        add
      </Button>
    </div>
  );
};
