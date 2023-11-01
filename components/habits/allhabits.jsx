import * as Action from "actions";
import Habit from "components/habits/Habit";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Modal from "./Modal";

export default function AllHabits({ goal }) {
  const router = useRouter();
  const { habits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();
  const { showModal, chosenHabit } = useSelector((state) => state.habits);

  useEffect(() => {
    dispatch(Action.getHabitsByGoal(goal.name));
  }, []);

  console.log("===================HABITS=====");
  console.log({ habits });
  const removeHabit = () => {
    dispatch(Action.deleteHabit(chosenHabit.id, chosenHabit.goal));
    dispatch(Action.updateModalShow(false));
    dispatch(Action.updateChosenHabit(null));
  };

  return (
    <div className="flex justify-center">
      <Modal
        isShow={showModal}
        title="Habit Deletion"
        text="Are you sue you want to delete habit"
        textButton="Delete Habit"
        onClick={removeHabit}
      />
      <div className="flex flex-col">
        {habits.length === 0 && <div>{"habit list is empty"}</div>}
        {habits?.length > 0 ? (
          <ul className="flex flex-wrap justify-center">
            {habits
              .sort((h1, h2) => {
                console.log({ d1: h1.createdAt, d2: h2.createdAt });
                return new Date(h2.createdAt) - new Date(h1.createdAt);
              })
              .map((habit, key) => (
                <li key={key}>
                  <Habit habitItem={habit} goal={goal} />
                </li>
              ))}
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
