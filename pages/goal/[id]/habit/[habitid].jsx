import Button from "components/habits/Button";
import Habit from "components/habits/Habit";
import * as API from "lib/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Action from "actions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "components/habits/Modal";

export const getServerSideProps = async (context) => {
  const { habitid } = context.query;
  console.log("================");
  console.log({ habitid });
  const habit = await API.getHabit(habitid);
  console.log("getServerSideProps");
  console.log(habit);
  return {
    props: { habit },
  };
};

export default function HabitItem({ habit }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { showModal, chosenGoal, chosenHabit } = useSelector(
    (state) => state.habits
  );

  useEffect(() => {}, [habit]);

  const removeHabit = () => {
    dispatch(Action.deleteHabit(chosenHabit.id, chosenHabit.goal));
    dispatch(Action.updateModalShow(false));
    dispatch(Action.updateChosenHabit(null));
    router.push(`/goal/${chosenGoal.id}/addhabit`);
  };

  return (
    <div>
      <Modal
        isShow={showModal}
        title="Habit Deletion"
        text="Are you sue you want to delete habit"
        textButton="Delete Habit"
        onClick={removeHabit}
      />
      <div className="flex absolute top-1 left-1 gap-1">
        <Button color="bg-gray_dark" onClick={() => router.back()}>
          back{" "}
        </Button>
        <Button color="bg-gray_dark" onClick={() => router.push("/goals")}>
          goals{" "}
        </Button>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col">
          {/* <div>{JSON.stringify(habit)}</div> */}
          <Habit habitItem={habit} showTable={true} />
        </div>
      </div>
    </div>
  );
}
