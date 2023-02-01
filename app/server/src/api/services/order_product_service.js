const  { Product, sequelize }  = require('../../database/models/');

const getAllProducts = async () => {
    const products = await Product.findAll();
    return products;
};

const getProductById = async (productId) => {
    const product = await Product.findByPk(productId);
    if (!product) {
        throw new Error(`Product with id ${productId} not found.`);
    }
    return product;
};

const createProduct = async (productData) => {
    const product = await Product.create(productData);
    return product;
};

const updateProduct = async (productId, updates) => {
    const product = await Product.findByPk(productId);
    if (!product) {
        throw new Error(`Product with id ${productId} not found.`);
    }
    await product.update(updates);
    return product;
};

const deleteProduct = async (productId) => {
    const product = await Product.findByPk(productId);
    if (!product) {
        throw new Error(`Product with id ${productId} not found.`);
    }
    await product.destroy();
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};


