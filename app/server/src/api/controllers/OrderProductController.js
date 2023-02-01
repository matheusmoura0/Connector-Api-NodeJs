const ProductService = require('../services/order_product_service');


const ProductController = {

    getAllProducts: async (req, res) => { 
        const products = await ProductService.getAllProducts();
        res.status(200).send(products);
    },

    getProductById: async (req, res) => { 
        const product = await ProductService.getProductById(req.params.id);
        res.status(200).send(product);
    },

    createProduct: (req, res) => {
        const data = req.body;
        console.log(data)
        ProductService.createProduct(data);
        res.status(200).send('Product created successfully');
    },

    updateProduct: (req, res) => {
        ProductService.updateProduct(req.params.id, req.body)
            .then(() => res.status(200).send())
            .catch(error => res.status(500).send(error));
    },

    deleteProduct: (req, res) => {
        ProductService.deleteProduct(req.params.id)
            .then(() => res.status(200).send())
            .catch(error => res.status(500).send(error));
    }
};

module.exports = ProductController;
