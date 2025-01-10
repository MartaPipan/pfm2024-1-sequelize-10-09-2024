'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
          // Relaciona mensagens com usuários
      Message.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      // Relaciona mensagens com grupos
      Message.belongsTo(models.Group, {
        foreignKey: 'groupId'
      });
      }
    }
  Message.init(
    {
      content: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [1, 512],
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Message',
      tableName: 'messages',
      underscored: true,
    }
  );
  return Message;
};