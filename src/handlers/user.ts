import { hashPassword, createJWT, comparePassword } from "../modules/auth";
import prisma from "../modules/db";

/**
 * @route POST /restaurant
 * @param {String} name - Restaurant name
 * @param {String} address - Restaurant address
 * @param {String} number - Restaurant number
 * @returns {Object} - Restaurant details
 */

export const signup = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
        email: req.body.email,
        number: req.body.number,
        ...(req.body.type && req.body.type !== "ADMIN"
          ? { type: req.body.type }
          : {}),
      },
    });

    console.log(user);
    const token = createJWT(user);
    res.send({ token });
  } catch (e) {
    console.log(e);
    res.status(400).send("Error creating user");
  }
};

/**
 * @route POST /login
 * @param {String} email - User email
 * @param {String} password - User password
 * @returns {String} - JWT token
 */

export const login = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) return res.status(404).send("User doesnt exist");

    const compare = await comparePassword(req.body.password, user.password);
    if (!compare) return res.status(400).send("Password is wrong");

    const token = createJWT(user);
    res.send({ token });
  } catch (e) {
    res.status(400).send("Error logging in");
  }
};
