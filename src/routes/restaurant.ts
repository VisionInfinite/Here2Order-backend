import { Router } from "express";
import prisma from "../modules/db";
import { checkUserType, checkIfOwner } from "../modules/middleware";

export const restaurant = Router();

restaurant.get("/info", (req, res) => {
  res.send("Restaurant route");
});

/**
 * @route GET /restaurant
 * @returns {Array} - List of all restaurants
 * @returns {Array} - List of all timings for each restaurant
 */

restaurant.get("/", async (req, res) => {
  const restaurants = await prisma.restaurant.findMany({
    include: {
      Timings: true,
    },
  });
  console.log(restaurants);
  res.status(200).json({ data: restaurants });
});

/**
 * @route GET /restaurant/:id
 * @param {String} id - Restaurant ID
 * @returns {Object} - Restaurant details
 * @returns {Array} - Menu items for the restaurant
 */

restaurant.get("/:id", async (req, res) => {
  const { id } = req.params;
  const menu = await prisma.restaurant.findUnique({
    where: {
      id: id,
    },

    include: {
      items: true,
    },
  });
  console.log(menu);
  res.status(200).json({ data: menu });
});

/**
 * @route POST /restaurant
 * @param {String} name - Restaurant name
 * @param {Number} tables - Number of tables
 * @param {String} address - Restaurant address
 * @param {String} phone - Restaurant phone number
 * @returns {Object} - Created restaurant
 */

restaurant.post("/", checkUserType, async (req, res) => {
  const { name, tables, address, phone } = req.body;
  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        tables,
        address,
        phone,
        ownerId: req.user.id,
      },
    });

    res.status(201).json({ data: restaurant });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the restaurant." });
  }
});

/**
 * model Items {
  id           String     @id @default(uuid())
  name         String
  catagory     String
  description  String
  image        String
  price        Float
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id])
  restaurantId String
}
 */

restaurant.put(":/id", checkUserType, checkIfOwner, async (req, res) => {
  const { id } = req.params;
  const { name, category, description, image, price } = req.body;
  try {
    const item = await prisma.items.create({
      data: {
        name,
        category,
        description,
        image,
        price,
        restaurantId: id,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the item." });
  }
});
