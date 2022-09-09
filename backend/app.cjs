import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blogRoutes.js";
import router from "./routes/userRoute.js";
import cors from "cors";

import pkg from "../config/keys";
const { MONGOURI } = pkg;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose
  .connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(5000))
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV !== "production") {
  const path = require("path");

  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

//TUhGAVXMlVTpnGZ9
