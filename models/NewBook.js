const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class NewBook extends Model {}

NewBook.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
              },
              author: {
                type: DataTypes.STRING,
                allowNull: false,
              },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'newbook',
    }  
);

module.exports = NewBook;
