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
handler.delete(async (req, res) => {
  const { id } = req.query;
  try {
    const doc = await DB.removeHabit(id);
    console.log("removeHabit");
    console.log(doc);
    if (doc === null) {
      throw new Error("no doc is found");
    }
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(450).send(error.message);
  }
});
export default handler;
