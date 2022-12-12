"use strict";


const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: process.env.DIALECT,
        define: {
            timestamps: false,
            freezeTableName: true,
        },
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// todo : ....

module.exports = db;
