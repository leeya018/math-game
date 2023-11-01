import * as types from "./types";
import axios from "axios";

import * as API from "lib/api";
import * as UTIL from "@/util";

function handleErrors(err) {
  if (err.response?.data) {
    return err.response?.data;
  } else if (err.message) {
    return err.message;
  } else {
    return "please check error handler function";
  }
}

export const addHabit = (habit) => async (dispatch) => {
  try {
    const newHabit = await API.addHabit(habit);
    dispatch({
      type: types.ADD_HABIT,
      payload: newHabit,
    });
  } catch (error) {
    console.log("addHabit error: ");
    console.log(error);
    dispatch({
      type: types.UPDATE_ERROR,
      payload: handleErrors(error),
    });
  }
};

export const getHabits = (category) => async (dispatch, getState) => {
  try {
    const habits = await API.getHabits(category);
    dispatch({
      type: types.GET_HABITS,
      payload: habits,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_ERROR,
      payload: handleErrors(error),
    });
  }
};

export const deleteHabit = (id) => async (dispatch) => {
  try {
    const deletedDoc = await API.deleteHabit(id);
    dispatch({
      type: types.REMOVE_HABIT,
      payload: deletedDoc,
    });
  } catch (error) {
    console.log("deleteHabit ->" + error.message);
    dispatch({
      type: types.UPDATE_ERROR,
      payload: handleErrors(error),
    });
  }
};

export const editHabit = (habit) => async (dispatch, getState) => {
  try {
    const editedHabit = await API.editHabit(habit);
    dispatch({
      type: types.EDIT_HABIT, //not doign a thing  - no therer e
      payload: editedHabit,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_ERROR,
      payload: handleErrors(error),
    });
  }
};
export const updateError = (payload) => {
  return {
    type: types.UPDATE_ERROR,
    payload,
  };
};

export const addGoal = (goal) => async (dispatch, getState) => {
  try {
    if (!goal.name || !goal.description || !goal.prize || !goal.punishment) {
      throw new Error("goal must be set");
    }
    if (new Date(goal.dateToAccomplish) <= new Date()) {
      throw new Error("dateToAccomplish must be in the future");
    }

    await API.addGoal(goal);
    dispatch({
      type: types.ADD_GOAL,
      payload: goal,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_ERROR,
      payload: handleErrors(error),
    });
  }
};

export const getCategories = () => async (dispatch) => {
  const url = UTIL.getUrl() + "/api/goals";
  console.log({ util: UTIL.getUrl() });
  console.log({ url });
  try {
    const res = await axios.get(url);
    dispatch({
      type: types.GET_CATEGORIES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_ERROR,
      payload: handleErrors(error),
    });
  }
};
export const getHabitsByGoal = (goal) => async (dispatch) => {
  const url = UTIL.getUrl() + "/api/habit";
  try {
    const res = await axios.get(url, {
      params: { goal },
    });
    dispatch({
      type: types.GET_HABITS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_ERROR,
      payload: handleErrors(error),
    });
  }
};

export const updateModalShow = (isShow) => {
  return {
    type: types.SHOW_MODAL,
    payload: isShow,
  };
};

export const updateChosenHabit = (chosenHabit) => {
  return {
    type: types.UPDATE_CHOSEN_HABIT,
    payload: chosenHabit,
  };
};
export const updateChosenGoal = (goal) => {
  return {
    type: types.UPDATE_CHOSEN_GOAL,
    payload: goal,
  };
};
