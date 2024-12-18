'use strict';
const {Model} = require('sequelize');
const {isBefore} = require('date-fns');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {    // Users -> users
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      field: 'first_name',
      allowNull: false,
      type: DataTypes.STRING(32),
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    lastName: {
      field: 'last_name',
      allowNull: false,
      type: DataTypes.STRING(32),
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(128),
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail:true
      }
    },
    password: {
      field:'password_hash',
      allowNull: false,
      type: DataTypes.TEXT,
       set(value) {
      // Storing passwords in plaintext in the database is terrible.
      // Hashing the value with an appropriate cryptographic hash function is better.
      this.setDataValue('password', 'hash_password_' + value);
    },
    },
    birthday: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
        isValidDate(value) {
          if (!isBefore(new Date(value), new Date())){
            throw new Error('Error: Invalid date(date in future)');
          }
        }
      }
      
    },
    isMale: {
      field: 'is_male',
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users', //Users -> users
    underscored: true
  });
  return User;
};