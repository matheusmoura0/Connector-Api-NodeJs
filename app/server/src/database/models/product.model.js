module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });
    Product.associate = (models) => {
        Product.belongsToMany(models.Order, {
            through: models.OrderItem,
            foreignKey: 'product_id',
            as: 'orders',
        });
    };

    return Product;
};