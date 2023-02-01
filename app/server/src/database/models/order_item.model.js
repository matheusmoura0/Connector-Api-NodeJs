
module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Order, {
            foreignKey: 'order_id',
            as: 'order',
        });
        OrderItem.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'product',
        });
    };

    return OrderItem;
};