const ProductService = require('../services/ProductService').ProductService;

async function list(_req, res) {
  const productService = new ProductService();
  const data = await productService.list();
  return res.json(data);
}

async function getById(req, res) {
  const productService = new ProductService();
  const data = await productService.getById(req.params.id);
  return res.json(data);
}

module.exports = {
  list,
  getById,
};
