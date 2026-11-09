
import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Express server is running" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
