import prisma from "../modules/db";

/**
 * @route GET /restaurant
 * @returns {Array} - List of all restaurants
 * @returns {Array} - List of all timings for each restaurant
 */

export const getRestaurants = async (req, res) => {
  const restaurants = await prisma.restaurant.findMany({
    include: {
      Timings: true,
    },
  });
  console.log(restaurants);
  res.status(200).json({ data: restaurants });
};

// export const getRestaurantsByOwner = async (req, res) => {};

/**
 * @route POST /restaurant
 * @param {String} name - Restaurant name
 * @param {Number} tables - Number of tables
 * @param {String} address - Restaurant address
 * @param {String} phone - Restaurant phone number
 * @returns {Object} - Created restaurant
 */

export const createRestaurant = async (req, res) => {
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
};
