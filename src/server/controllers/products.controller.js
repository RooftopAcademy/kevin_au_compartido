import products from "../models/Product"

export const getProducts = async (req, res) => {
  try {
    res.json(products)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
