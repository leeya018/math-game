import * as Action from "actions";

import Button from "components/habits/Button";
import Title from "components/habits/Title";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const geItem = (arr, id) => {
  return arr.filter((item) => item.id === id)[0];
};

export default function Handle({ id }) {
  const router = useRouter();
  const { habits } = useSelector((state) => state.habits);
  const [habit, setHabit] = useState(geItem(habits, id));
  const dispatch = useDispatch();

  const updateHabit = ({ name, value }) => {
    dispatch(Action.updateError(""));
    setHabit((prev) => ({ ...prev, [name]: value }));
  };

  const updateHabitHandle = () => {
    dispatch(Action.editHabit(newHabit));
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <Title>NEW HABIT </Title>
        <input
          type="text"
          name="name"
          value={habit?.name}
          onChange={(e) => updateHabit(e.target)}
        />
        <input
          type="text"
          name="description"
          value={habit?.description}
          onChange={(e) => updateHabit(e.target)}
        />
        <input
          type="text"
          name="amount"
          value={habit?.amount}
          onChange={(e) => updateHabit(e.target)}
        />
        <input
          type="text"
          name="goal"
          value={habit?.goal}
          onChange={(e) => updateHabit(e.target)}
        />
      </div>
      <Button onClick={updateHabitHandle}>update habit</Button>
    </div>
  );
}
