module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {});

  Order.associate = (models) => {
    Order.belongsTo(models.Buyer, {
      foreignKey: 'buyer_id',
      as: 'buyer',
    });
    Order.belongsToMany(models.Product, {
      through: models.OrderItem,
      foreignKey: 'order_id',
      as: 'products',
    });
  };

  return Order;
};