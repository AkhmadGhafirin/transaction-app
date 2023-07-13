'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Status, { foreignKey: 'status' })
    }
  }
  Transaction.init({
    productID: DataTypes.STRING,
    productName: DataTypes.STRING,
    amount: DataTypes.STRING,
    customerName: DataTypes.STRING,
    status: DataTypes.INTEGER,
    transactionDate: DataTypes.DATE,
    createBy: DataTypes.STRING,
    createOn: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};