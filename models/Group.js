'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      // define association here
      Group.belongsToMany(models.User, {
        through: 'users_to_groups',
        foreignKey: 'groupId'
      });
      Group.hasMany(models.Message, {
        foreignKey: 'groupId'
      });
    }
  }
  Group.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    imagePath: {
      field: 'image_path',
      type: DataTypes.TEXT
    },
    description: { type: DataTypes.STRING }
  },
    {
    sequelize,
    modelName: 'Group',
    tableName: 'groups',
    underscored: true 
  });
  return Group;
};