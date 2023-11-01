import Button from "./Button";
import * as Action from "actions";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Title from "./Title";
import * as UTIL from "@/util";

// getCategories
export default function Goal({ goal }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const shortDate = UTIL.getDateStr(goal.dateToAccomplish);
  const timeLeft = UTIL.getDaysDiff(goal.dateToAccomplish, new Date());
  console.log({ goal });
  return (
    <li
      className="flex flex-col justify-between  shadow-lg items-center bg-gray w-[350px]
       h-[250px] p-2"
    >
      <h1
        className="font-medium text-[18px]  w-[177px] 
          h-[30px] relative text-center"
      >
        <Title> {goal.name}</Title>
      </h1>

      <div className="">description: {goal.description} </div>
      <div className="">dateToAccomplish: {shortDate}</div>
      <div className="">prize: {goal.prize}</div>
      <div className="">punishment: {goal.punishment}</div>
      <div className="">
        time left:{" "}
        <span className={`${timeLeft < 10 ? "text-red" : "text-blue_dark"}`}>
          {timeLeft}
        </span>
      </div>

      <Button
        onClick={() => {
          dispatch(Action.updateChosenGoal(goal));
          router.push(`/goal/${goal.id}/addhabit`);
        }}
        position="relative "
        size={"w-[128px] h-[43px]"}
        color="bg-blue"
      >
        see habits
      </Button>
    </li>
  );
}
