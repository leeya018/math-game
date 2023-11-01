import Goal from "models/Goal";
import Habit from "models/Habit";
import dbConnect from "./dbConnect";

export const addGoal = async (goal) => {
  try {
    await dbConnect();
    console.log(goal);
    const res = await Goal.create(goal);
    return res.acknowledged;
  } catch (error) {
    throw error;
  }
};

export const addHabit = async (habit) => {
  try {
    await dbConnect();
    console.log("addHabit");
    console.log(habit);
    const ifFound = await Habit.findOne({ name: habit.name });
    if (ifFound) {
      throw new Error("habit name already exists");
    }
    const newHabit = new Habit(habit);
    const res = await newHabit.save();
    return res;
  } catch (error) {
    throw error;
  }
};
export const removeHabit = async (id) => {
  try {
    await dbConnect();

    console.log(id);
    const doc = await Habit.findOneAndDelete({ id: id });
    console.log(doc);
    return doc;
  } catch (error) {
    throw error;
  }
};
export const updateHabit = async (habit) => {
  try {
    await dbConnect();
    console.log("update habit");
    console.log(habit);
    let newHabit = { ...habit };
    delete newHabit._id;
    const updatedDoc = await Habit.findOneAndUpdate(
      { id: habit.id },
      newHabit,
      {
        new: true,
      }
    );
    console.log("updatedDoc");
    console.log(updatedDoc);
    return updatedDoc;

    // throw new Error("doc is not found");
  } catch (error) {
    throw error;
  }
};
export const getHabit = async (id) => {
  try {
    await dbConnect();
    console.log("getHabit", id);
    const habit = await Habit.findOne({ id: id });
    if (!habit) throw new Error("doc is not found");
    console.log(habit);
    return habit;
  } catch (error) {
    throw error;
  }
};

export const getHabitsByGoal = async (goal) => {
  try {
    await dbConnect();
    const res = await Habit.find({ goal });
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    await dbConnect();
    const res = await Goal.find({});
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getGaolById = async (id) => {
  try {
    await dbConnect();
    const res = await Goal.findOne({ id });
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
};
export const getGaolByName = async (name) => {
  try {
    await dbConnect();
    const res = await Goal.findOne({ name });
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
};
export const getGoalsFilter = async (commandType, startDate, endDate) => {
  const filter = {
    createdAt: { $gte: startDate, $lte: endDate },
    ...(commandType !== "all" && { commandType }),
  };
  try {
    await dbConnect();
    const res = await Goal.find(filter);
    return res;
  } catch (error) {
    throw error;
  }
};
