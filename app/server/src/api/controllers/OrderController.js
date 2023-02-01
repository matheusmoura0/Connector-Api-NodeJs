const {
    Order,
    OrderItem,
    Product,
    Buyer
} = require('../../database/models/');

exports.create = async (req, res) => {
    const {
        buyerId,
        items
    } = req.body;
    try {
        const buyer = await Buyer.findByPk(buyerId);
        if (!buyer) return res.status(404).send({
            error: 'Buyer not found'
        });

        const order = await Order.create({
            buyer_id: buyerId
        });

        for (const item of items) {
            const {
                productId,
                quantity
            } = item;
            const product = await Product.findByPk(productId);
            if (!product) return res.status(404).send({
                error: 'Product not found'
            });

            const orderItem = await OrderItem.create({
                order_id: order.id,
                product_id: productId,
                quantity,
            });
        }

        return res.send({
            message: 'Order created'
        });
    } catch (error) {
        return res.status(500).send({
            error: 'Error creating order'
        });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [{
                    model: Product,
                    as: 'products',
                    through: {
                        model: OrderItem,
                    },
                },
                {
                    model: Buyer,
                    as: 'buyer',
                },
            ],
        });
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            buyerName,
            buyerEmail
        } = req.body;

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({
                error: 'Order not found'
            });
        }

        const updatedOrder = await order.update({
            buyerName,
            buyerEmail
        });

        return res.json({
            order: updatedOrder
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};