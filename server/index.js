import express from "express";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected");
  })
  .catch((e) => {
    console.log(e);
  });
const app = express();

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
