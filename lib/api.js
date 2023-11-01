import axios from "axios";
import * as UTIL from "@/util";

export const getHabits = async (goal) => {
  try {
    const url = UTIL.getUrl() + `/api/habit`;
    console.log("getHabits api");
    console.log(goal);
    const res = await axios.get(url, { params: { goal } });
    console.log({ res });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGoals = async () => {
  try {
    const url = UTIL.getUrl() + `/api/goals`;

    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGoal = async (id) => {
  try {
    const url = UTIL.getUrl() + `/api/goal/${id}`;

    const res = await axios.get(url, { params: { id } });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getGoalByName = async (name) => {
  try {
    const url = UTIL.getUrl() + `/api/goal`;

    const res = await axios.get(url, { params: { name } });

    return res.data;
  } catch (error) {
    console.log(error);
    // throw new Error(error)
    // throw error;
  }
};
export const getHabit = async (id) => {
  try {
    const url = UTIL.getUrl() + `/api/habit/${id}`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
export const editHabit = async (habit) => {
  try {
    const url = UTIL.getUrl() + `/api/habit/update`;
    // const res = await axios.post(url, { hellow: "tnroitsn" });
    const res = await axios.post(url, habit);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const addHabit = async (habit) => {
  try {
    const url = UTIL.getUrl() + `/api/habit/add`;
    const res = await axios.post(url, habit);

    return res.data;
  } catch (error) {
    throw error;
  }
};
export const addGoal = async (goal) => {
  try {
    const url = UTIL.getUrl() + `/api/goal/add`;
    const res = await axios.post(url, goal);

    return res.data;
  } catch (error) {
    throw error;
  }
};
export const deleteHabit = async (id) => {
  try {
    const urlDelete = UTIL.getUrl() + "/api/habit/remove";
    const res = await axios.delete(urlDelete, {
      params: { id },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
