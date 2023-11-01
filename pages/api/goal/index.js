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

handler.get(async (req, res) => {
  console.log("req.query");
  console.log(req.query);
  const { name } = req.query;
  //   return res.status(200).send({ id, name: "ntiera" });
  try {
    const data = await DB.getGaolByName(name);

    return res.status(200).send(data);
  } catch (error) {
    return res.status(450).send(error.message);
  }
});

export default handler;
