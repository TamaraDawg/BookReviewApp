const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Book extends Model {}

Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      book_cover: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
            }
        },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      synopsis: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
              len: [1, 50000]
            }
        },
        author: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        release_date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'book',
    }
);
  

module.exports = Book;
