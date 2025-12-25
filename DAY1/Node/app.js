const express = require("express");
const mongoose = require("mongoose");
const tasksRouter = require("./routes/tasks");

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/taskdb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
