import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const verifyJWT = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401).send("Unauthorized");
    return;
  }

  const token = bearer.split(" ")[1];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    console.log(payload);
    next();
  } catch (e) {
    res.status(401).send("Invalid JWT Token");
    return;
  }
};
