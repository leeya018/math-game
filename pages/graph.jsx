import Graph from "components/habits/Graph";
import { useRouter } from "next/router";
import * as API from "lib/api";

export async function getServerSideProps(context) {
  const { habitid } = context.query;
  const habit = await API.getHabit(habitid);
  console.log({ habitData: habit });
  return {
    props: { habit }, // will be passed to the page component as props
  };
}
export default function Homepage({ habit }) {
  const router = useRouter();
  // const { habits } = useSelector((state) => state.habits);
  console.log({ habit });
  const dataArr = habit.traces.map((trace) => ({
    date: trace.date,
    amount: trace.amount,
  }));
  return (
    <div className="">
      <h1>graph</h1>
      <Graph
        items={dataArr.sort(
          (dataA, dataB) => new Date(dataA.date) - new Date(dataB.date)
        )}
        totalAmount={parseInt(habit.amount)}
        goalName={habit.goalName}
        habitName={habit.mame}
      />
    </div>
  );
}
