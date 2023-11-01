import Button from "components/habits/Button";
import { useRouter } from "next/router";
import AllHabits from "components/habits/allhabits";
import * as API from "lib/api";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const goal = await API.getGoal(id);
  return {
    props: { goal }, // will be passed to the page component as props
  };
}
export default function AddHabit({ goal }) {
  const router = useRouter();

  return (
    <div>
      <div className="flex gap-1 ">
        <Button
          color="bg-gray_dark"
          onClick={() => {
            router.back();
          }}
        >
          go back
        </Button>
        <Button
          color="bg-gray_dark"
          onClick={() => {
            router.push(`/goals`);
          }}
        >
          goals{" "}
        </Button>
        <Button
          color="bg-blue"
          onClick={() => {
            router.push(`/goal/${goal.id}/addhabit`);
            // router.push(`/goal/${goal.id}/addhabit`);
          }}
        >
          add habit{" "}
        </Button>
      </div>
      <AllHabits goal={goal} />
    </div>
  );
}
