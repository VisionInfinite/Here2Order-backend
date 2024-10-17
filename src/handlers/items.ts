import prisma from "../modules/db";

/**
 * @route GET /restaurant/:id
 * @param {String} id - Restaurant ID
 * @returns {Object} - Restaurant details
 * @returns {Array} - Menu items for the restaurant
 */

export const getItemsById = async (req, res) => {
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
};

/**
 * @route PUT /restaurant/:id
 * @param {String} id - Restaurant ID
 * @param {String} name - Item name
 * @param {String} category - Item category
 * @param {String} description - Item description
 * @param {String} image - Item image
 * @param {Number} price - Item price
 * @returns {Object} - Created item
 */

export const insertItemById = async (req, res) => {
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

    res.status(201).json({ data: item });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the item." });
  }
};
