import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getTopics } from "./database.js";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/topics", async (request, response) => {
  console.log(response.body);

  try {
    const topics = await getTopics();
    response.json(topics);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log("Successfully running on port", PORT);
});
