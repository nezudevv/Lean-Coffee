import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getTopics, addOrUpdateTopic, deleteTopic } from "./database.js";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Getting topic data from database.
app.get("/api/topics", async (request, response) => {
  console.log(response.body);
  try {
    const topics = await getTopics();
    response.json(topics);
  } catch (err) {
    console.log(err);
  }
});

//Posting (possibly updated) topic data to database
app.post("/api/", async (req, res) => {
  const topic = req.body;
  res.send("you there");
  try {
    addOrUpdateTopic(topic);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    res.json(await deleteTopic(id));
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/topic/:id", async (req, res) => {
  const topic = req.body;
  const { id } = req.params;
  console.log(req.body);
  topic.id = id;
  try {
    const updatedTopic = await addOrUpdateTopic(topic);
    res.json(updatedTopic);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log("Successfully running on port", PORT);
});
