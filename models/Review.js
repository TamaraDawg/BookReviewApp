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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key:'id'
            }
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'book',
                key:'id'
            }
        },        
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'review',

    }
);

module.exports = Review;
