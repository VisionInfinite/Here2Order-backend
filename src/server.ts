import express from "express";
import * as dotenv from "dotenv";
import { login, signup } from "./handlers/user";
import { verifyJWT } from "./modules/auth";
import { restaurant } from "./routes/restaurant";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Here2Order Backend!");
});

app.post("/signup", signup);
app.post("/login", login);

app.use("/restaurant", verifyJWT, restaurant);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running at http://localhost:${process.env.PORT || 3000}`
  );
});
