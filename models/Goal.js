import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  dateToAccomplish: {
    type: String,
    required: true,
  },
  prize: {
    type: String,
    required: true,
  },
  punishment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.Goal || mongoose.model("Goal", GoalSchema);
