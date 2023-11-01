import nc from "next-connect";
import * as DB from "lib/db";

import cors from "cors";

const handler = nc();

// use cors middleware and set options
handler.use(
  cors({
    origin: "*", // adjust this to the origin you prefer
    methods: ["GET", "POST", "PUT", "DELETE"], // adjust this to the methods you need
    allowedHeaders: ["Content-Type", "Authorization"], // adjust headers to what you need
  })
);
handler.post(async (req, res) => {
  const habit = req.body;
  try {
    console.log({ habit });
    const result = await DB.updateHabit(habit);
    return res.status(200).send(result);
    return res.status(200).send("habit was updated");
  } catch (error) {
    return res.status(450).send(error.message);
  }
});
export default handler;
