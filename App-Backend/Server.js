import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 8000;

app.get("/", () => {});

app.listen(PORT, () => {
  console.log("Successfully running on port", PORT);
});
