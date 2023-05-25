const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Genre extends Model {}

Genre.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
            },
        genre_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1, 100]
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'genre',
    }
);

module.exports = Genre;