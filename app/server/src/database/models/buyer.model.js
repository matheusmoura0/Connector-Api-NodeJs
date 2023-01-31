module.exports = (sequelize, DataTypes) => {
  const Buyer = sequelize.define('Buyer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Buyer.associate = (models) => {
    Buyer.hasMany(models.Order, {
      foreignKey: 'buyer_id',
      as: 'orders',
    });
  };

  return Buyer;
};