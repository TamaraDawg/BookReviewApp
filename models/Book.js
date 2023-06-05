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
        book_cover: { // URL to image, or we could save images locally
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false, //duplicate titles causing err's 
            validate: {
                len: [1, 200]
            }
        },
        synopsis: {
            type: DataTypes.TEXT, // will be a long paragraph
            allowNull: false,
            validate: {
                len: [1, 50000]
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 200]
            }
        },
        release_date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: true,
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
