'use strict';
const { isBefore } = require('date-fns');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
 /**define association here */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User,
        {foreignKey: 'userId'});
    }
  }
  Task.init({
    content: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    deadline: {
      allowNull: false,
      type: DataTypes.DATE,
       validate: {
        isDate: true,
        isValidDate(value) {
          if (isBefore(new Date(value), new Date())){
            throw new Error('Error: Invalid date, check deadline');
          }
        }
      }
    },
    isDone: {
      field:'is_done',
      allowNull: false,
      defaultValue:false,
      type: DataTypes.BOOLEAN,
      validate: {
        notNull: true,
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    underscored: true
  });
  return Task;
};