import Button from "components/habits/Button";
import Input from "components/habits/Input";
import Title from "components/habits/Title";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useSelector } from "react-redux";
import Error from "components/habits/Error";
import { useEffect } from "react";

export default function HabitHandle({
  goal,
  onClick,
  updateHabit,
  habit,
  title,
}) {
  const router = useRouter();

  const { habits, error, chosenGoal } = useSelector((state) => state.habits);
  const inputRef = useRef(null);
  console.log(goal);
  useEffect(() => {
    if (inputRef.current) {
      inputRef?.current?.focus();
    }
  }, [inputRef.current]);
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <div
          className="flex flex-col justify-between  shadow-lg items-center bg-gray w-[350px]
       h-[300px] m-2 py-4 "
        >
          {/* <input type="text" ref={inputRef} /> */}
          <Title extra="">{title}</Title>
          <div className="w-[80%] h-[50%]  flex flex-col justify-between">
            <RowSection
              inputRef={inputRef}
              text={"name"}
              value={habit.name}
              updateHabit={updateHabit}
              type={"text"}
            />
            <RowSection
              text={"description"}
              value={habit.description}
              updateHabit={updateHabit}
              type={"text"}
            />
            <RowSection
              text={"amount"}
              value={habit.amount}
              type={"number"}
              updateHabit={updateHabit}
            />
            <RowSection
              text={"prize"}
              value={habit.prize}
              type={"string"}
              updateHabit={updateHabit}
            />
            <RowSection
              text={"punishment"}
              value={habit.punishment}
              type={"string"}
              updateHabit={updateHabit}
            />
            <div className="flex justify-between">
              <span>goal : </span>

              <span className="self-baseline text-start w-[66%] ">{goal}</span>
            </div>
          </div>
          <Button size={"w-[128px] h-[43px]"} color="bg-blue" onClick={onClick}>
            {title}
          </Button>
          {/* <div>{JSON.stringify(habits)}</div>
        {/* <div>{JSON.stringify(habit)}</div> */}{" "}
        </div>
      </div>
      <Error>{error}</Error>
    </div>
  );
}

function RowSection({ inputRef, text, value, type, updateHabit }) {
  return (
    <div className="flex justify-between ">
      <span>{text + ":"}</span>
      <Input
        inputRef={inputRef}
        type={type}
        name={text}
        value={value}
        onChange={(e) => updateHabit(e.target)}
      />
    </div>
  );
}
