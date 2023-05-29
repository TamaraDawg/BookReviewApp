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
            unique: true,
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
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        genre_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'genre',
                key:'id'
            }
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
