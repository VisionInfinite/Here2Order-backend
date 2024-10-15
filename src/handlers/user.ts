import { hashPassword, createJWT, comparePassword } from "../modules/auth";
import prisma from "../modules/db";

export const signup = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
      email: req.body.email,
      number: req.body.number,
    },
  });
  console.log(user);
  const token = createJWT(user);
  res.send({ token });
};

export const login = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user) res.status(404).send("User doesnt exist");

  const compare = await comparePassword(req.body.password, user.password);
  if (!compare) res.status(400).send("Password is wrong");

  const token = createJWT(user);
  res.send({ token });
};
