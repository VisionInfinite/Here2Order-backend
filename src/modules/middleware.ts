import prisma from "./db";
import { validationResult } from "express-validator";

export const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  } else {
    next();
  }
};

export const checkIfUser = async (req, res, next) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: req.body.email }, { number: req.body.number }],
    },
  });

  if (user)
    return res
      .status(400)
      .send("User with this email or number already exists");
  next();
};

export const checkUserType = (req, res, next) => {
  if (!req.user || req.user.type === "USER") {
    res.status(401).send("USER TYPE Unauthorized");
    return;
  }
  next();
};

export const checkIfOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await prisma.restaurant.findUnique({
      where: {
        id: id,
      },
    });

    if (data.ownerId !== req.user.id) {
      res.status(401).send("Unauthorized");
      return;
    }

    next();
  } catch (e) {
    res.status(401).send("ERROR");
    return;
  }
};
