'use strict';


const  { Product, Order, sequelize }  = require('../../database/models/');


const createOrder = async (orderData) => {
    const {
        buyer_name,
        buyer_email,
        products
    } = orderData;

    const order = await Order.create({
        buyer_name,
        buyer_email,
    });

    for (const product of products) {
        const {
            product_id,
            quantity
        } = product;

        const dbProduct = await Product.findByPk(product_id);
        if (!dbProduct) {
            throw new Error(`Product with id ${product_id} not found.`);
        }

        await order.addProduct(dbProduct, {
            through: {
                quantity
            }
        });
    }

    return order;
};

module.exports = {
    createOrder,
};
