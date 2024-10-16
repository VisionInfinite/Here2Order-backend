import prisma from "./db";

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
