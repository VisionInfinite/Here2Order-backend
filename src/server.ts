import express from "express";
import * as dotenv from "dotenv";
import { body } from "express-validator";
import { login, signup } from "./handlers/user";
import { verifyJWT } from "./modules/auth";
import { handleInputErrors, checkIfUserExist } from "./modules/middleware";
import { route } from "./routes/main";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Here2Order Backend!");
});

app.post(
  "/signup",
  body("username").isString(),
  body("password").isString(),
  body("email").isEmail(),
  body("number").isString(),
  handleInputErrors,
  checkIfUserExist,
  signup
);

app.post(
  "/login",
  body("email").isEmail(),
  body("password").isString(),
  handleInputErrors,
  login
);

app.use("/api", verifyJWT, route);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running at http://localhost:${process.env.PORT || 3000}`
  );
});
