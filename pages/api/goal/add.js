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
  const goal = req.body;
  try {
    const data = await DB.addGoal(goal);

    return res.status(200).send("succuss");
  } catch (error) {
    return res.status(450).send(error.message);
  }
});

export default handler;
