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
        console.log(buyerId, items)
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
            error: error.message
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

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const { buyer_id, items } = req.body;

        if (buyer_id) {
            const buyer = await Buyer.findByPk(buyer_id);
            if (!buyer) {
                return res.status(404).json({ error: 'Buyer not found' });
            }
            order.buyer_id = buyer_id;
        }

        if (items) {
            const orderItems = await OrderItem.findAll({
                where: { order_id: id },
            });
            await Promise.all(
                orderItems.map(async (orderItem) => {
                    await orderItem.destroy();
                })
            );
            const newOrderItems = items.map((item) => {
                return {
                    order_id: id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                };
            });
            await OrderItem.bulkCreate(newOrderItems);
        }

        await order.save();

        return res.json({
            id,
            buyer_id: order.buyer_id,
            items: items,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}
