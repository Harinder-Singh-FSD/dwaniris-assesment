import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;
app.get("/users/table", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/users/pie", async (req, res) => {
  res.json({
    data: [
      ["User", "Salary"],
      ["Leanne Graham", 1250],
      ["Ervin Howell", 421],
      ["Clementine Bauch", 957],
      ["Patricia Lebsack", 759],
      ["Chelsey Dietrich", 1548],
      ["Mrs. Dennis Schulist", 1748],
      ["Kurtis Weissnat", 1045],
      ["Nicholas Runolfsdottir", 954],
      ["Glenna Reichert", 1848],
      ["Clementina DuBuque", 1043],
    ],
  });
});

app.listen(PORT, (err) => {
  if (err) throw new Error("Server Connection Issue");
  console.log("server connected");
});
