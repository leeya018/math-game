import { AddGoal } from "../components/AddGoal";
import * as Action from "actions";
import Button from "components/habits/Button";
import Input from "components/habits/Input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Goal from "components/habits/Goal";
import { v4 as uuidv4 } from "uuid";
import Error from "components/habits/Error";

export default function Goals({}) {
  // getCategories
  const [goalObj, setGoalObj] = useState({
    name: "",
    description: "",
    dateToAccomplish: "",
  });

  const { goals, error } = useSelector((state) => state.habits);
  const router = useRouter();
  console.log(goals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Action.getCategories());
  }, []);

  const updateGoal = ({ name, value }) => {
    setGoalObj((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    dispatch(Action.updateError(""));
    console.log({ goalObj });
    dispatch(
      Action.addGoal({
        ...goalObj,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      })
    );

    !error &&
      setGoalObj({
        name: "",
        description: "",
        dateToAccomplish: "",
        prize: "",
        punishment: "",
      });
  };

  const sort = (arr) => {
    return arr.sort((g1, g2) => {
      console.log({ g1: g1.createdAt, g2: g2.createdAt });
      return new Date(g2.createdAt) - new Date(g1.createdAt);
    });
  };

  return (
    <div>
      {/* // first time */}
      <div className="flex justify-center border-2">
        <AddGoal
          goalObj={goalObj}
          updateGoal={updateGoal}
          handleAdd={handleAdd}
        />
      </div>
      <Error>{error}</Error>

      <ul className="m-2 flex flex-wrap justify-center gap-2">
        {sort(goals).map((goal, key) => (
          <Goal key={key} goal={goal} />
        ))}
      </ul>
    </div>
  );
}
