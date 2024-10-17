import { Router } from "express";
import { body, param } from "express-validator";
import {
  checkIfTypeOwner,
  checkIfOwnerById,
  handleInputErrors,
} from "../modules/middleware";
import { getRestaurants, createRestaurant } from "../handlers/restaurant";
import { getItemsById, insertItemById } from "../handlers/items";

export const route = Router();

route.get("/info", (req, res) => {
  res.send("Restaurant route");
});

route.get("/", getRestaurants);

route.get("/:id", param("id").isUUID(), handleInputErrors, getItemsById);

route.post(
  "/",
  body("name").isString(),
  body("table").isString(),
  body("address").isString(),
  body("phone").isString(),
  handleInputErrors,
  checkIfTypeOwner,
  createRestaurant
);

route.put(
  ":/id",
  param("id").isUUID(),
  body("name").isString(),
  body("category").isString(),
  body("description").isString(),
  body("image").isString(),
  body("price").isFloat(),
  handleInputErrors,
  checkIfTypeOwner,
  checkIfOwnerById,
  insertItemById
);
