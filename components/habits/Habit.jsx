import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import * as Action from "actions";
import * as UTIL from "@/util";
import Title from "./Title";
import { useRouter } from "next/router";
import { useState } from "react";
import BasicTable from "./Table";
import * as API from "lib/api";

import { BsTrash, BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

const validateHabit = (habit) => {
  const newTraces =
    typeof habit.traces[0] === "string"
      ? JSON.parse(habit.traces)
      : habit.traces;
  habit.traces = newTraces;
  return habit;
};

export default function Habit({ habitItem, showTable = false, goal = null }) {
  const {
    id,
    name,
    description,
    amount,
    punishment,
    prize,
    traces,
    createdAt,
    goal: goalName,
  } = habitItem;
  const dispatch = useDispatch();
  const router = useRouter();

  const [goalItem, setGoalItem] = useState(goal);
  const [habit, setHabit] = useState(validateHabit(habitItem));
  // const [traceItems, setTraceItems] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const { chosenGoal } = useSelector((state) => state.habits);

  // const { showModal } = useSelector((state) => state.habits);
  // useEffect(() => {
  //   let parsedTraces =
  //     typeof habit.traces[0] === "string"
  //       ? JSON.parse(habit.traces)
  //       : habit.traces;
  //   setTraceItems(parsedTraces);
  //   console.log("%cYour message here", "color: green; font-size: 20px;");
  // }, [habit]);

  useEffect(() => {
    completLostDays();
    if (!goalItem) {
      console.log({ goalName });
      API.getGoalByName(goalName).then((data) => {
        // not adding
        console.log({ data });
        setGoalItem(data);
      });
    }
  }, []);
  console.log({ habit });
  // console.log(JSON.parse(habit.traces));

  const completLostDays = () => {
    const lastItem =
      habit.traces &&
      habit.traces.sort((item1, item2) => item2.date - item1.date)[0];
    if (!lastItem) return;
    const daysDiff = Math.floor(
      (new Date() - new Date(lastItem?.date)) / (1000 * 60 * 60 * 24)
    );
    console.log({ daysDiff });
    let i = 1;
    let dupTraces = [...habit.traces];
    while (i <= daysDiff) {
      const newDay = UTIL.addDays(lastItem.date, i);
      console.log({ newDay });
      dupTraces.push({
        date: newDay,
        amount: 0,
        habitBlocker: "",
        habitImplementationStrategy: "",
        dailyLesson: "",
      });
      i++;
    }
    let dupHabit = { ...habit };
    dupHabit.traces = dupTraces;
    setHabit(dupHabit);
    dispatch(Action.editHabit(dupHabit));
  };

  const createNewTrace = () => {
    return {
      date: new Date().toISOString(),
      amount: 1,
      habitBlocker: "",
      habitImplementationStrategy: "",
      dailyLesson: "",
    };
  };
  console.log({ habitItem });
  const addTraces = (amountToAdd) => {
    setIsChanged(true);

    const dupHabit = { ...habit };
    if (!dupHabit.traces || dupHabit.traces.length === 0) {
      dupHabit.traces = [];
      dupHabit.traces.push(createNewTrace());
    } else {
      const len = dupHabit.traces.length;

      if (UTIL.datesAreEquals(dupHabit.traces[0].date, new Date())) {
        const newAmount = dupHabit.traces[0].amount + amountToAdd;
        if (newAmount >= 0) {
          dupHabit.traces[0].amount = newAmount;
        }
      } else {
        dupHabit.traces.push(createNewTrace());
      }
    }
    setHabit(dupHabit);
  };

  const updateTodaysHabit = ({ name, value }, index) => {
    let dupHabit = { ...habit };

    const dupTraces = [...habit.traces];
    dupTraces[index][name] = value;
    dupHabit.traces = dupTraces;
    setHabit(dupHabit);

    setIsChanged(true);
  };

  const saveHabit = () => {
    console.log("saveHabit");
    console.log({ habit });
    dispatch(Action.editHabit(habit));
    setIsChanged(false);
  };

  const showGraph = () => {
    router.push(`/graph?habitid=${habit.id}`);
  };
  const isExpired = () => {
    return UTIL.getDaysDiff(new Date(), habit.createdAt) >= UTIL.daysToExpired;
  };
  return (
    <div className="flex flex-col">
      <div className="flex justify-center ">
        <div
          className="border-2 flex flex-col justify-between relative shadow-lg items-center bg-gray w-[350px]
       h-[250px] m-2 "
        >
          {isExpired() && (
            <div className="absolute top-0 right-0 bg-opacity-20 flex justify-center items-center  bg-yellow font-bold text-2xl w-full h-full">
              <div className="transform rotate-45 text-gray_dark text-4xl">
                Expired
              </div>
            </div>
          )}
          <div
            className="absolute top-3 flex flex-col right-1 p-2 cursor-pointer"
            onClick={() => setShowNav((prev) => !prev)}
          >
            <BsThreeDotsVertical />

            {showNav && !isExpired() && (
              <div className="absolute right-10">
                <div className="flex flex-col gap-2">
                  <BsTrash
                    className="text-red"
                    onClick={() => {
                      dispatch(Action.updateModalShow(true));
                      console.log("chosent on trash =>  " + habitItem.id);
                      console.log({ trashHabit: habitItem });
                      dispatch(Action.updateChosenHabit(habitItem));
                    }}
                  />
                  <AiOutlineEdit
                    onClick={() => {
                      dispatch(Action.updateChosenGoal(goalItem));
                      router.push(
                        `/goal/${goalItem.id}/edithabit/${habitItem.id}`
                      );
                    }}
                    className="text-blue"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="px-2 flex flex-col justify-between top-2 h-[70%]">
            {isChanged && (
              <Button
                size="w-[90px] h-[43px]"
                position={"absolute top-0 right-0"}
                onClick={saveHabit}
              >
                save
              </Button>
            )}
            <Title extra={"flex justify-center"}>{name}</Title>

            <RowSection text={"description"} value={description} />
            <RowSection text={"amount"} value={amount} />
            <RowSection text={"prize"} value={prize} />
            <RowSection text={"punishment"} value={punishment} />
            <RowSection
              text={"createdAt"}
              value={UTIL.getDateStrIsrael(createdAt)}
            />
            <RowSection text={"goal"} value={goalName} />
          </div>
          {router.pathname.includes("/habit/") ? (
            <div>
              <div className="flex justify-center gap-1">
                <Button size="w-[43px] h-[43px]" onClick={() => addTraces(-1)}>
                  -
                </Button>
                <Button size="w-[43px] h-[43px]" onClick={() => addTraces(1)}>
                  +
                </Button>
              </div>
              <Button
                size="w-[90px] h-[43px]"
                position={"absolute top-0 left-0"}
                onClick={showGraph}
              >
                to graph
              </Button>
            </div>
          ) : (
            <div className="flex justify-center gap-2 relative bottom-2">
              <Button
                color="bg-blue"
                onClick={() => {
                  Action.updateChosenGoal(goal);
                  router.push(`/goal/${goal.id}/habit/${habit.id}`);
                }}
              >
                Details
              </Button>
            </div>
          )}
        </div>
      </div>
      {showTable && (
        <ul className="flex flex-col">
          <BasicTable
            totalAmount={habit.amount}
            items={
              // JSON.parse(habit.traces).sort(
              habit.traces.sort(
                (itemA, itemB) => new Date(itemB.date) - new Date(itemA.date)
              ) || []
            }
            updateTodaysHabit={updateTodaysHabit}
          />
        </ul>
      )}
    </div>
  );
}

function RowSection({ text, value }) {
  return (
    <div className="flex ">
      <span>{text + " : " + value}</span>
    </div>
  );
}
