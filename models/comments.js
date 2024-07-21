'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comments.belongsTo(models.Users,{
        foreignKey: 'UserId'
      });
      // define association here
    }
  }
  Comments.init({
    UserId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1
      }},
    ImageId:{
      type :DataTypes.STRING,
      allowNull: false,
      validate: {
        isDate: true,
      }},
    Comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 128]
      }}
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};