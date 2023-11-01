import * as types from "../types";

const habitInitial = {
  goals: [],
  habits: [],
  error: "",
  chosenGoal: null,
  chosenHabit: null,
  showModal: false,
};

let newHabits = null;
const habitReducer = (state = habitInitial, { type, payload }) => {
  console.log({ type });
  switch (type) {
    case types.ADD_HABIT:
      return { ...state, habits: [...state.habits, payload] };
    case types.ADD_GOAL:
      return { ...state, goals: [...state.goals, payload] };
    case types.UPDATE_HABIT:
      newHabits = state.habits.map((habit) =>
        habit.id === payload ? { ...habit, payload } : habit
      );
      return { ...state, habits: newHabits };
    case types.ADD_AMOUNT_TO_HABIT:
      newHabits = state.habits.map((habit) =>
        habit.id === payload ? { ...habit, amount: habit.amount + 1 } : habit
      );
      return { ...state, habits: newHabits };

    case types.REMOVE_HABIT:
      newHabits = state.habits.filter((habit) => habit.id !== payload.id);
      return { ...state, habits: newHabits };
    case types.EDIT_HABIT:
      newHabits = state.habits.map((habit) => {
        if (habit.id === payload.id) {
          return payload;
        }
        return habit;
      });
      return { ...state, habits: newHabits };

    case types.UPDATE_ERROR:
      return { ...state, error: payload };
    case types.ADD_DID_AMOUNT:
      return { ...state, habits: newHabits };
    case types.GET_CATEGORIES:
      return { ...state, goals: payload };

    case types.GET_HABITS:
      return { ...state, habits: payload };
    case types.UPDATE_CHOSEN_GOAL:
      return { ...state, chosenGoal: payload };
    case types.UPDATE_CHOSEN_HABIT:
      console.log({ payload });
      return { ...state, chosenHabit: payload };
    case types.SHOW_MODAL:
      return { ...state, showModal: payload };
    default:
      return state;
  }
};

export default habitReducer;
