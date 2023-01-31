const { Buyer, Product, Order, OrderItem } = require('../models');

const buyers = [
  { name: 'John Doe', email: 'johndoe@example.com' },
  { name: 'Jane Doe', email: 'janedoe@example.com' }
];

const products = [
  { name: 'Product A', price: 10.0 },
  { name: 'Product B', price: 20.0 },
  { name: 'Product C', price: 30.0 }
];

const orders = [
  { buyer_id: 1, order_date: new Date('2022-01-01') },
  { buyer_id: 2, order_date: new Date('2022-02-01') }
];

const order_items = [
  { order_id: 1, product_id: 1, quantity: 2 },
  { order_id: 1, product_id: 2, quantity: 1 },
  { order_id: 2, product_id: 3, quantity: 3 }
];

const seed = async () => {
  const createdBuyers = await Buyer.bulkCreate(buyers, { returning: true });
  const createdProducts = await Product.bulkCreate(products, { returning: true });
  const createdOrders = await Order.bulkCreate(orders, { returning: true });
  
  const orderItemsWithIds = order_items.map(item => ({
    ...item,
    order_id: createdOrders[item.order_id - 1].id,
    product_id: createdProducts[item.product_id - 1].id,
  }));
  
  await OrderItem.bulkCreate(orderItemsWithIds);
};

module.exports = seed;





