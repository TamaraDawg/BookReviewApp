const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
            },
        review_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 1000]
            }
        },
        review_rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
                min: 1,
                max: 5
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key:'id'
            }
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'reviews',
    }
);

module.exports = Review;
